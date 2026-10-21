import test from 'node:test';
import assert from 'node:assert/strict';
import { mountListeningLab } from './listening-lab.mjs';

class FakeNode {
  constructor() {
    this.listeners = new Map(); this.children = []; this.disabled = false;
    this.textContent = ''; this.checked = false; this.value = '';
  }
  addEventListener(type, callback) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), callback]);
  }
  fire(type, detail = {}) {
    for (const callback of this.listeners.get(type) ?? []) callback(detail);
  }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  setAttribute(name, value) { this[name] = value; }
  removeAttribute(name) { delete this[name]; }
  pause() { this.paused = true; }
  load() {}
  play() { this.played = true; return Promise.resolve(); }
}
function fixture() {
  const IDs = [
    'iyappy-audio-file', 'iyappy-audio', 'iyappy-audio-status', 'iyappy-audio-range',
    'iyappy-set-a', 'iyappy-set-b', 'iyappy-play-ab', 'iyappy-loop-ab',
    'iyappy-clear-marks', 'iyappy-mark-pulse', 'iyappy-mark-prominence',
    'iyappy-mark-boundary', 'iyappy-record', 'iyappy-stop-record',
    'iyappy-listening-marks',
  ];
  const nodes = Object.fromEntries(IDs.map((id) => [id, new FakeNode()]));
  const section = new FakeNode();
  section.querySelector = (selector) => nodes[selector.slice(1)] ?? null;
  section.ownerDocument = { createElement: () => new FakeNode() };
  const root = { querySelector: (selector) => selector === '#iyappy-listening-lab' ? section : null };
  return { root, nodes };
}
test('local playback, learner observations, A–B looping and clearing stay independent of quizzes', () => {
  const { root, nodes } = fixture();
  const id = (name) => nodes['iyappy-' + name];
  mountListeningLab({ root });
  assert.equal(id('set-a').disabled, true);
  assert.equal(id('play-ab').disabled, true);
  id('audio-file').files = [new Blob(['sample'], { type: 'audio/wav' })];
  id('audio-file').fire('change');
  id('audio').duration = 10;
  id('audio').fire('loadedmetadata');
  assert.equal(id('set-a').disabled, false);
  assert.match(id('audio-status').textContent, /Recording ready/);
  id('audio').currentTime = 1;
  id('set-a').fire('click');
  id('audio').currentTime = 3;
  id('set-b').fire('click');
  assert.equal(id('play-ab').disabled, false);
  id('play-ab').fire('click');
  assert.equal(id('audio').currentTime, 1);
  id('loop-ab').checked = true;
  id('audio').currentTime = 3.5;
  id('audio').fire('timeupdate');
  assert.equal(id('audio').currentTime, 1);
  id('audio').currentTime = 2.25;
  id('mark-prominence').fire('click');
  assert.equal(id('listening-marks').children.length, 1);
  assert.match(id('listening-marks').children[0].children[0].textContent, /Perceived prominence/);
  id('clear-marks').fire('click');
  assert.equal(id('listening-marks').children.length, 0);
  assert.equal(id('play-ab').disabled, true);
  assert.equal(id('loop-ab').checked, false);
  id('audio-file').files = [new Blob([new Uint8Array(25 * 1024 * 1024 + 1)])];
  id('audio-file').fire('change');
  assert.match(id('audio-status').textContent, /25 MB or less/);
});
