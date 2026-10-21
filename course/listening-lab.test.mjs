import test from 'node:test';
import assert from 'node:assert/strict';
import { boundedSegment, formatTime, listenerMark } from './listening-lab.mjs';

test('time labels are stable and reject invalid observations', () => {
  assert.equal(formatTime(0), '00:00.000');
  assert.equal(formatTime(61.239), '01:01.239');
  assert.equal(formatTime(-1), '—');
  assert.equal(formatTime(NaN), '—');
});
test('loops require two ordered, in-bounds marks separated by at least 150ms', () => {
  assert.deepEqual(boundedSegment(1, 2, 3), { start: 1, end: 2 });
  assert.equal(boundedSegment(2, 1, 3), null);
  assert.equal(boundedSegment(0.1, 0.2, 3), null);
  assert.equal(boundedSegment(-0.1, 1, 3), null);
  assert.equal(boundedSegment(1, 5, 3), null);
  assert.equal(boundedSegment(undefined, 5, 3), null);
  assert.equal(boundedSegment(1, 2, Infinity), null);
});
test('marks are attributed to listener perception, not language correctness', () => {
  assert.deepEqual(listenerMark(1.25, 5, 'prominence'), {
    time: 1.25, kind: 'prominence', label: 'Perceived prominence',
  });
  assert.equal(listenerMark(-1, 5, 'boundary'), null);
  assert.equal(listenerMark(5.1, 5, 'pulse'), null);
  assert.equal(listenerMark(1, 5, 'pitch-certified'), null);
});
