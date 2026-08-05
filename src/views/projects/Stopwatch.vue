<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface HistoryEntry {
  ms: number;
  date: string;
  note: string;
}

const STORAGE_CURRENT = 'stopwatch-current-value';
const STORAGE_HISTORY = 'stopwatch-history';
const MAX_HISTORY = 6;

const elapsedMs = ref(0);
const running = ref(false);
const hasValue = ref(false);
const history = ref<HistoryEntry[]>([]);

let startedAt = 0;
let intervalId: number | undefined;

const bigSeconds = computed(() => Math.floor(elapsedMs.value / 1000));
const hundredths = computed(() => Math.floor((elapsedMs.value % 1000) / 10).toString().padStart(2, '0'));
const smallFormatted = computed(() => {
  const total = bigSeconds.value;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

function formatEntry(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const cs = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  const m = Math.floor(totalSeconds / 60);
  return m > 0 ? `${totalSeconds}.${cs}s (${m} min)` : `${totalSeconds}.${cs}s`;
}

function loadState() {
  const storedCurrent = localStorage.getItem(STORAGE_CURRENT);
  if (storedCurrent !== null) {
    const ms = Number(storedCurrent);
    if (!Number.isNaN(ms)) {
      elapsedMs.value = ms;
      hasValue.value = true;
    }
  }
  const storedHistory = localStorage.getItem(STORAGE_HISTORY);
  if (storedHistory) {
    try {
      history.value = JSON.parse(storedHistory);
    } catch {
      history.value = [];
    }
  }
}

function saveCurrent() {
  localStorage.setItem(STORAGE_CURRENT, String(elapsedMs.value));
}

function saveHistory() {
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.value));
}

function tick() {
  elapsedMs.value = Date.now() - startedAt;
}

function start() {
  if (running.value) return;
  if (hasValue.value) {
    history.value.unshift({ ms: elapsedMs.value, date: new Date().toLocaleString('de-CH'), note: '' });
    history.value = history.value.slice(0, MAX_HISTORY);
    saveHistory();
  }
  elapsedMs.value = 0;
  hasValue.value = false;
  startedAt = Date.now();
  running.value = true;
  intervalId = window.setInterval(tick, 20);
}

function stop() {
  if (!running.value) return;
  running.value = false;
  hasValue.value = true;
  if (intervalId) window.clearInterval(intervalId);
  saveCurrent();
}

function reset() {
  running.value = false;
  hasValue.value = false;
  elapsedMs.value = 0;
  if (intervalId) window.clearInterval(intervalId);
  localStorage.removeItem(STORAGE_CURRENT);
}

// Voice control //
const voiceSupported = ref(false);
const voiceActive = ref(false);
const voiceError = ref('');
const lastHeard = ref('');
const micStatus = ref('');
let recognition: any = null;

const START_WORDS = ['start', 'los', 'go', 'schtart', 'jetzt'];
const STOP_WORDS = ['stop', 'stopp', 'halt', 'fertig', 'schluss', 'aus', 'schtop'];
const RESET_WORDS = ['reset', 'clear', 'zurücksetzen', 'löschen'];

function safeStart() {
  try {
    recognition.start();
  } catch {
    // already running - ignore, a session is already active
  }
}

function setupRecognition() {
  const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognitionCtor) {
    voiceSupported.value = false;
    return;
  }
  voiceSupported.value = true;
  recognition = new SpeechRecognitionCtor();
  recognition.lang = 'de-CH';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    micStatus.value = 'session started - waiting for audio';
  };

  recognition.onaudiostart = () => {
    micStatus.value = 'audio stream connected - waiting for speech';
  };

  recognition.onspeechstart = () => {
    micStatus.value = 'speech detected - recognizing…';
  };

  recognition.onresult = (event: any) => {
    const lastResult = event.results[event.results.length - 1];
    const transcript: string = lastResult[0].transcript.toLowerCase().trim();
    lastHeard.value = transcript;

    let matched = true;
    if (RESET_WORDS.some((w) => transcript.includes(w))) {
      reset();
    } else if (START_WORDS.some((w) => transcript.includes(w))) {
      start();
    } else if (STOP_WORDS.some((w) => transcript.includes(w))) {
      stop();
    } else {
      matched = false;
    }

    // interim results fire repeatedly for the same utterance as it gets refined, and
    // Chrome doesn't reliably finalize results in continuous mode - a stale refinement
    // of THIS utterance could otherwise fire again seconds later and trigger a second,
    // unwanted action. Force-close the session right after acting so the next result
    // always starts from a clean slate; onend below restarts listening automatically.
    if (matched) recognition.stop();
  };

  recognition.onerror = (event: any) => {
    const err = event.error;
    // expected/frequent during continuous listening - the onend restart below handles these
    if (err === 'no-speech' || err === 'aborted') return;
    voiceError.value = err;
    if (err === 'not-allowed' || err === 'service-not-allowed') {
      voiceActive.value = false;
    }
  };

  recognition.onend = () => {
    if (voiceActive.value) {
      micStatus.value = 'restarting…';
      // small delay - restarting immediately can throw InvalidStateError in some browsers
      window.setTimeout(safeStart, 250);
    }
  };
}

function toggleVoice() {
  if (!voiceSupported.value) return;
  voiceActive.value = !voiceActive.value;
  voiceError.value = '';
  micStatus.value = '';
  if (voiceActive.value) {
    safeStart();
  } else {
    recognition.stop();
  }
}

onMounted(() => {
  loadState();
  setupRecognition();
});

onBeforeUnmount(() => {
  if (intervalId) window.clearInterval(intervalId);
  if (recognition && voiceActive.value) {
    voiceActive.value = false;
    recognition.stop();
  }
});
</script>

<template>
  <div class="page">
    <RouterLink class="back text" to="/projects">← projects</RouterLink>
    <div class="stopwatch">
      <div class="big-number">{{ bigSeconds }}<span class="tenths">.{{ hundredths }}s</span></div>
      <div class="small-number">{{ smallFormatted }} min</div>

      <div class="buttons">
        <button :disabled="running" @click="start">Start</button>
        <button :disabled="!running" @click="stop">Stop</button>
        <button :disabled="running || !hasValue" @click="reset">Reset</button>
      </div>

      <div class="voice">
        <button v-if="voiceSupported" class="voice-btn" :class="{ active: voiceActive }" @click="toggleVoice"
          :aria-label="voiceActive ? 'stop voice control' : 'enable voice control'">
          <svg v-if="voiceActive" class="mic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M0 0h48v48H0z" fill="none" />
            <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
              <rect width="14" height="27" x="17" y="4" rx="7" />
              <path stroke-linecap="round" d="M9 23c0 8.284 6.716 15 15 15s15-6.716 15-15M24 38v6" />
            </g>
          </svg>
          <svg v-else class="mic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M0 0h48v48H0z" fill="none" />
            <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
              <path d="M31 24V11a7 7 0 1 0-14 0v13a7 7 0 1 0 14 0Z" />
              <path stroke-linecap="round"
                d="M9 23c0 8.284 6.716 15 15 15c1.753 0 3.436-.3 5-.853M39 23a14.95 14.95 0 0 1-1.248 6M24 38v6m18-2L6 6" />
            </g>
          </svg>
        </button>
        <div v-else class="text voice-hint">Voice control isn't supported in this browser.</div>
        <div v-if="voiceActive" class="text voice-hint">say "start" to begin, "stop" to capture, "reset" to clear</div>
        <div v-if="voiceActive && micStatus" class="text voice-hint">status: {{ micStatus }}</div>
        <div v-if="voiceActive && lastHeard" class="text voice-hint">heard: "{{ lastHeard }}"</div>
        <div v-if="voiceError" class="text voice-error">mic error: {{ voiceError }}</div>
      </div>

      <div v-if="history.length" class="history">
        <div class="title2">last stopwatches</div>
        <div class="history-list">
          <div v-for="(entry, i) in history" :key="i" class="history-item">
            <span class="text history-time">{{ formatEntry(entry.ms) }}</span>
            <input type="text" class="history-note" placeholder="note" v-model="entry.note" @input="saveHistory" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  align-items: center;
}

.back {
  align-self: flex-start;
}

.stopwatch {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

@font-face {
  font-family: 'Azeret Mono';
  src: url('../../assets/fonts/AzeretMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Azeret Mono';
  src: url('../../assets/fonts/AzeretMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

$mono: 'Azeret Mono', ui-monospace, Menlo, Consolas, 'Courier New', monospace;

.big-number {
  font-family: $mono;
  font-weight: 700;
  font-size: clamp(5rem, 25vw, 10rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  width: 5ch;
  text-align: center;
}

.tenths {
  font-size: 0.3em;
  font-weight: 600;
  color: var(--text);
}

.small-number {
  margin-top: 0.5rem;
  font-family: $mono;
  font-size: clamp(1rem, 3vw, 1.4rem);
  color: var(--font-inactive);
  font-variant-numeric: tabular-nums;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-family: inherit;
  border: 1px solid var(--bg-grey-outer);
  background: var(--bg-white);
  cursor: pointer;
  min-width: 6rem;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}

button:active:not(:disabled) {
  background: var(--bg-grey-mid);
}

.voice {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.voice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-width: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border-color: #a9c9e8;
}

.voice-btn.active {
  background: #a9e8b9;
  color: var(--bg-grey-outer);
}

.mic-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
}

.voice-hint {
  margin-top: 0.5rem;
  color: var(--font-inactive);
}

.voice-error {
  margin-top: 0.5rem;
  color: var(--red);
}

.history {
  margin-top: 3rem;
  width: 100%;
}

.history-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background: var(--bg-grey-mid);
}

.history-time {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.history-note {
  flex: 1;
  min-width: 0;
  text-align: right;
  border: none;
  border-bottom: 1px solid var(--bg-grey-outer);
  background: transparent;
  font-family: inherit;
  font-size: clamp(0.8rem, 1.2vw, 1.2rem);
  color: var(--text);
  padding: 0.2rem 0;
}

.history-note:focus {
  outline: none;
  border-bottom-color: var(--text);
}
</style>
