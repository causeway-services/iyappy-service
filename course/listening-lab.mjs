/** Private listener-directed timing lab; never recognizes or grades speech. */

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  const totalMilliseconds = Math.round(seconds * 1000);
  const minutes = Math.floor(totalMilliseconds / 60000);
  const withinMinute = totalMilliseconds % 60000;
  const wholeSeconds = Math.floor(withinMinute / 1000);
  const milliseconds = withinMinute % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(wholeSeconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

export function boundedSegment(start, end, duration) {
  if (![start, end, duration].every(Number.isFinite) || duration <= 0) return null;
  if (start < 0 || end > duration || end - start < 0.15) return null;
  return Object.freeze({ start, end });
}

export function listenerMark(time, duration, kind) {
  const labels = {
    pulse: 'Felt pulse',
    prominence: 'Perceived prominence',
    boundary: 'Perceived phrase boundary',
  };
  if (!Object.hasOwn(labels, kind) || !Number.isFinite(time)
      || !Number.isFinite(duration) || time < 0 || time > duration) return null;
  return Object.freeze({ time, kind, label: labels[kind] });
}

export function mountListeningLab({ root }) {
  const section = root.querySelector('#iyappy-listening-lab');
  if (!section) return;
  const find = (id) => section.querySelector(`#${id}`);
  const input = find('iyappy-audio-file');
  const audio = find('iyappy-audio');
  const status = find('iyappy-audio-status');
  const range = find('iyappy-audio-range');
  const setA = find('iyappy-set-a');
  const setB = find('iyappy-set-b');
  const playAB = find('iyappy-play-ab');
  const loop = find('iyappy-loop-ab');
  const clear = find('iyappy-clear-marks');
  const markPulse = find('iyappy-mark-pulse');
  const markProminence = find('iyappy-mark-prominence');
  const markBoundary = find('iyappy-mark-boundary');
  const record = find('iyappy-record');
  const stopRecord = find('iyappy-stop-record');
  const marksList = find('iyappy-listening-marks');
  const controls = [setA, setB, playAB, loop, clear, markPulse, markProminence, markBoundary];
  let fileUrl = null;
  let recorder = null;
  let microphone = null;
  let recordingTimer = null;
  let recordingRevision = 0;
  let start = null;
  let end = null;
  let marks = [];
  let ready = false;

  function segment() { return boundedSegment(start, end, audio.duration); }
  function render() {
    record.disabled = !!recorder || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined';
    stopRecord.disabled = !recorder;
    input.disabled = !!recorder;
    const selected = segment();
    for (const element of controls) element.disabled = !ready;
    playAB.disabled = !ready || !selected;
    loop.disabled = !ready || !selected;
    if (!selected) loop.checked = false;
    range.textContent = `A ${formatTime(start)} · B ${formatTime(end)}${selected ? ' · interval ready' : ' · choose A before B'}`;
    marksList.replaceChildren();
    for (const mark of [...marks].sort((a, b) => a.time - b.time)) {
      const item = section.ownerDocument.createElement('li');
      const seek = section.ownerDocument.createElement('button');
      seek.type = 'button';
      seek.textContent = `${formatTime(mark.time)} — ${mark.label}`;
      seek.setAttribute('aria-label', `Seek to ${mark.label} at ${formatTime(mark.time)}`);
      seek.addEventListener('click', () => { audio.currentTime = mark.time; });
      item.append(seek);
      marksList.append(item);
    }
  }

  function disposeFile() {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    fileUrl = null;
    ready = false;
    start = null;
    end = null;
    marks = [];
    render();
  }
  function loadLocalAudio(blob, description) {
    disposeFile();
    fileUrl = URL.createObjectURL(blob);
    audio.src = fileUrl;
    audio.load();
    status.textContent = `Reading ${description} locally…`;
  }
  input.addEventListener('change', () => {
    disposeFile();
    const file = input.files?.[0];
    if (!file) { status.textContent = 'Choose an audio recording to begin.'; return; }
    if (file.size > MAX_AUDIO_BYTES) {
      status.textContent = 'Choose a recording of 25 MB or less for this local exercise.';
      input.value = '';
      return;
    }
    loadLocalAudio(file, 'this recording');
  });
  function releaseMicrophone() {
    if (recordingTimer) clearTimeout(recordingTimer);
    recordingTimer = null;
    microphone?.getTracks().forEach((track) => track.stop());
    microphone = null;
    recorder = null;
    render();
  }
  record.addEventListener('click', async () => {
    const revision = ++recordingRevision;
    audio.pause();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (revision !== recordingRevision) { stream.getTracks().forEach((track) => track.stop()); return; }
      microphone = stream;
      const nextRecorder = new MediaRecorder(stream);
      recorder = nextRecorder;
      const chunks = [];
      nextRecorder.addEventListener('dataavailable', (event) => { if (event.data.size) chunks.push(event.data); });
      nextRecorder.addEventListener('stop', () => {
        releaseMicrophone();
        if (revision !== recordingRevision) return;
        const blob = new Blob(chunks, { type: nextRecorder.mimeType || 'audio/webm' });
        if (blob.size) loadLocalAudio(blob, 'your recording');
        else status.textContent = 'No audio was captured. Try another recording.';
      }, { once: true });
      nextRecorder.start();
      recordingTimer = setTimeout(() => { if (nextRecorder.state === 'recording') nextRecorder.stop(); }, 30_000);
      status.textContent = 'Microphone active. Speak or sing for up to 30 seconds, then stop.';
      render();
    } catch {
      releaseMicrophone();
      status.textContent = 'Recording unavailable or microphone permission was declined. You can still choose a local audio file.';
    }
  });
  stopRecord.addEventListener('click', () => {
    if (recorder?.state === 'recording') recorder.stop();
  });
  audio.addEventListener('loadedmetadata', () => {
    ready = Number.isFinite(audio.duration) && audio.duration > 0;
    status.textContent = ready
      ? `Recording ready (${formatTime(audio.duration)}). Play, listen, and mark what you hear.`
      : 'This recording has no bounded duration; try a different local file.';
    render();
  });
  audio.addEventListener('error', () => {
    ready = false;
    status.textContent = 'Your browser could not play this file. Try an audio format it supports.';
    render();
  });
  setA.addEventListener('click', () => { start = audio.currentTime; render(); });
  setB.addEventListener('click', () => { end = audio.currentTime; render(); });
  playAB.addEventListener('click', () => {
    const selected = segment();
    if (!selected) return;
    audio.currentTime = selected.start;
    audio.play().catch(() => { status.textContent = 'Playback was blocked; use the player controls.'; });
  });
  audio.addEventListener('timeupdate', () => {
    const selected = segment();
    if (loop.checked && selected && audio.currentTime >= selected.end) audio.currentTime = selected.start;
  });
  audio.addEventListener('ended', () => {
    const selected = segment();
    if (loop.checked && selected) {
      audio.currentTime = selected.start;
      audio.play().catch(() => { status.textContent = 'Use the player controls to resume.'; });
    }
  });
  clear.addEventListener('click', () => {
    start = null;
    end = null;
    marks = [];
    loop.checked = false;
    render();
    status.textContent = 'Listening marks cleared. Your audio file is still local and loaded.';
  });
  for (const [button, kind] of [[markPulse, 'pulse'], [markProminence, 'prominence'], [markBoundary, 'boundary']]) {
    button.addEventListener('click', () => {
      const mark = listenerMark(audio.currentTime, audio.duration, kind);
      if (!mark) return;
      if (marks.length >= 100) {
        status.textContent = 'This practice accepts up to 100 marks. Clear the marks to begin again.';
        return;
      }
      marks.push(mark);
      render();
      status.textContent = `${mark.label} at ${formatTime(mark.time)}. This is your observation, not an automatic language judgment.`;
    });
  }
  globalThis.addEventListener?.('pagehide', () => {
    recordingRevision++;
    if (recorder?.state === 'recording') recorder.stop();
    releaseMicrophone();
    disposeFile();
  }, { once: true });
  render();
}

