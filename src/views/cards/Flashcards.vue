<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute } from "vue-router";
import { loadTopics, loadCards, loadedOffline, type Card, type Topic } from "../../cards/sheet";

const route = useRoute();
const slug = route.params.topic as string;
const KNOWN_KEY = `cards-known-${slug}`;
const TOTAL_KEY = `cards-total-${slug}`;

// ---------- Speicher (Fortschritt & Einstellungen pro Gerät) ----------
function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

// ---------- Zustand ----------
type Mode = "cards" | "write";
const mode = ref<Mode>(read("cards-mode", "cards"));
const reverse = ref<boolean>(read("cards-reverse", false));
const shuffleOn = ref<boolean>(read("cards-shuffle", true));
watch(mode, (v) => write("cards-mode", v));
watch(reverse, (v) => write("cards-reverse", v));
watch(shuffleOn, (v) => write("cards-shuffle", v));

const topic = ref<Topic | null>(null);
const allCards = ref<Card[]>([]);
const known = ref<Set<string>>(new Set(read<string[]>(KNOWN_KEY, [])));
const loading = ref(true);
const error = ref("");
const offline = ref(false);

// Runde: Karten werden der Reihe nach bewertet; falsche kommen in der nächsten Runde wieder
interface Rating {
  idx: number;
  ok: boolean;
  wasKnown: boolean;
}
const round = ref<number[]>([]);
const roundNo = ref(1);
const pos = ref(0);
const ratings = ref<Rating[]>([]);
const flipped = ref(false);

const keyOf = (c: Card) => c.front;
const currentIdx = computed(() => round.value[pos.value]);
const current = computed(() => (currentIdx.value === undefined ? null : allCards.value[currentIdx.value]));
const roundDone = computed(() => !loading.value && allCards.value.length > 0 && pos.value >= round.value.length);
const knownCount = computed(() => allCards.value.filter((c) => known.value.has(keyOf(c))).length);
const roundRight = computed(() => ratings.value.filter((r) => r.ok).length);
const roundMissed = computed(() => ratings.value.filter((r) => !r.ok).map((r) => r.idx));

// Je nach Richtung: Frage/Antwort tauschen. Das Bild gehört immer zur Vorderseite aus dem Sheet.
const question = computed(() => (current.value ? (reverse.value ? current.value.back : current.value.front) : ""));
const answer = computed(() => (current.value ? (reverse.value ? current.value.front : current.value.back) : ""));
const questionImage = computed(() => (!reverse.value ? current.value?.image : undefined));
const answerImage = computed(() => (reverse.value ? current.value?.image : undefined));

function shuffled(list: number[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startRound(list: number[], resetCounter = false) {
  round.value = shuffleOn.value ? shuffled(list) : [...list].sort((a, b) => a - b);
  roundNo.value = resetCounter ? 1 : roundNo.value + 1;
  pos.value = 0;
  ratings.value = [];
  resetCard();
}

// Neue Runde mit allen noch nicht gelernten Karten (oder allen, falls schon alles sitzt)
function startFresh() {
  const all = allCards.value.map((_, i) => i);
  const open = all.filter((i) => !known.value.has(keyOf(allCards.value[i])));
  startRound(open.length ? open : all, true);
}

function rate(ok: boolean) {
  const c = current.value;
  if (!c) return;
  const k = keyOf(c);
  ratings.value.push({ idx: currentIdx.value, ok, wasKnown: known.value.has(k) });
  const s = new Set(known.value);
  ok ? s.add(k) : s.delete(k);
  known.value = s;
  write(KNOWN_KEY, [...s]);
  pos.value++;
  resetCard();
}

function undo() {
  const last = ratings.value.pop();
  if (!last) return;
  const k = keyOf(allCards.value[last.idx]);
  const s = new Set(known.value);
  last.wasKnown ? s.add(k) : s.delete(k);
  known.value = s;
  write(KNOWN_KEY, [...s]);
  pos.value--;
  resetCard();
}

function resetProgress() {
  if (!confirm("Fortschritt für dieses Thema zurücksetzen?")) return;
  known.value = new Set();
  write(KNOWN_KEY, []);
  startFresh();
}

function toggleShuffle() {
  shuffleOn.value = !shuffleOn.value;
  // Restliche Karten der Runde neu ordnen, Bewertetes bleibt
  const done = round.value.slice(0, pos.value);
  const rest = round.value.slice(pos.value);
  round.value = [...done, ...(shuffleOn.value ? shuffled(rest) : rest.sort((a, b) => a - b))];
}

// ---------- Karten-Modus: Umdrehen & Wischen ----------
const dragX = ref(0);
const dragging = ref(false);
const flyOut = ref<0 | 1 | -1>(0);
let startX = 0;
let startY = 0;
let moved = false;

function resetCard() {
  flipped.value = false;
  dragX.value = 0;
  flyOut.value = 0;
  typed.value = "";
  checked.value = null;
  if (mode.value === "write") nextTick(() => inputEl.value?.focus());
}

function onPointerDown(e: PointerEvent) {
  if (flyOut.value) return;
  startX = e.clientX;
  startY = e.clientY;
  moved = false;
  dragging.value = true;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - startY)) moved = true;
  if (moved) dragX.value = dx;
}
function onPointerUp() {
  if (!dragging.value) return;
  dragging.value = false;
  if (!moved) {
    flipped.value = !flipped.value;
    return;
  }
  if (Math.abs(dragX.value) > 90) swipeRate(dragX.value > 0);
  else dragX.value = 0;
}
function swipeRate(ok: boolean) {
  if (flyOut.value || !current.value) return;
  flyOut.value = ok ? 1 : -1;
  setTimeout(() => rate(ok), 220);
}

const cardStyle = computed(() => {
  const x = flyOut.value ? flyOut.value * 600 : dragX.value;
  return {
    // in Ruhe kein transform → Text bleibt gestochen scharf
    transform: x ? `translateX(${x}px) rotate(${x / 25}deg)` : "none",
    transition: dragging.value ? "none" : "transform 0.22s ease-out",
  };
});
const swipeHint = computed(() => {
  const x = flyOut.value ? flyOut.value * 200 : dragX.value;
  return { ok: x > 0, strength: Math.min(Math.abs(x) / 120, 1) };
});

// ---------- Schreib-Modus ----------
const typed = ref("");
const checked = ref<null | "right" | "wrong">(null);
const inputEl = ref<HTMLInputElement | null>(null);

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(der|die|das|den|dem|des|ein|eine|the|a|an) /, ""); // Artikel am Anfang ignorieren
}
function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function check() {
  if (checked.value) return next();
  if (!typed.value.trim()) return;
  const t = normalize(typed.value);
  const a = normalize(answer.value);
  // Kleine Tippfehler sind ok: ab 5 Buchstaben 1 Fehler, danach ca. 1 pro 6 Zeichen. Zahlen müssen exakt stimmen.
  const tolerance = /^[0-9 ]+$/.test(a) || a.length < 5 ? 0 : Math.max(1, Math.floor(a.length / 6));
  checked.value = t === a || distance(t, a) <= tolerance ? "right" : "wrong";
}
function next(override?: boolean) {
  rate(override ?? checked.value === "right");
}

// ---------- Tastatur ----------
function onKey(e: KeyboardEvent) {
  if (loading.value || e.metaKey || e.ctrlKey || e.altKey) return;
  const inInput = (e.target as HTMLElement)?.tagName === "INPUT";
  if (roundDone.value) {
    if (e.key === "Enter") roundMissed.value.length ? startRound(roundMissed.value) : startFresh();
    return;
  }
  if (inInput) return;
  if (e.key === "Backspace" || e.key === "z") return undo();
  if (mode.value !== "cards") return;
  if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    flipped.value = !flipped.value;
  } else if (e.key === "ArrowRight") swipeRate(true);
  else if (e.key === "ArrowLeft") swipeRate(false);
}

watch(mode, () => resetCard());

onMounted(async () => {
  window.addEventListener("keydown", onKey);
  try {
    const topics = await loadTopics();
    topic.value = topics.find((t) => t.slug === slug) ?? null;
    if (!topic.value) throw new Error("Dieses Thema gibt es nicht.");
    document.title = `${topic.value.title} – Lernkarten`;
    allCards.value = await loadCards(topic.value.tab);
    offline.value = loadedOffline();
    write(TOTAL_KEY, allCards.value.length);
    startFresh();
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
    if (mode.value === "write") nextTick(() => inputEl.value?.focus());
  }
});
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="page">
    <div class="wrap">
      <RouterLink to="/cards" class="backLink">← Alle Themen</RouterLink>
      <h1 class="title">{{ topic?.title ?? "Lernkarten" }}</h1>

      <p v-if="loading" class="subtitle">Lade Karten…</p>
      <p v-else-if="error" class="hint">{{ error }}</p>
      <p v-else-if="!allCards.length" class="hint">In diesem Thema hat es noch keine Karten.</p>

      <template v-else>
        <p v-if="offline" class="hint">Offline – du lernst mit der zuletzt geladenen Version.</p>

        <div class="modes" role="tablist">
          <button role="tab" :aria-selected="mode === 'cards'" :class="{ on: mode === 'cards' }" @click="mode = 'cards'">
            Karten
          </button>
          <button role="tab" :aria-selected="mode === 'write'" :class="{ on: mode === 'write' }" @click="mode = 'write'">
            Schreiben
          </button>
        </div>

        <div class="meta">
          <span v-if="!roundDone">Runde {{ roundNo }} · {{ pos + 1 }} / {{ round.length }}</span>
          <span v-else>Runde {{ roundNo }} fertig</span>
          <span>{{ knownCount }} / {{ allCards.length }} kann ich</span>
        </div>
        <div class="bar"><div class="fill" :style="{ width: (knownCount / allCards.length) * 100 + '%' }"></div></div>

        <!-- Rundenende -->
        <div v-if="roundDone" class="summary">
          <p class="big">{{ roundMissed.length ? "Runde geschafft!" : "🎉 Alles gewusst!" }}</p>
          <p>
            <span class="ok">{{ roundRight }} gewusst</span> ·
            <span class="nok">{{ roundMissed.length }} noch nicht</span>
          </p>
          <button v-if="roundMissed.length" class="primary" @click="startRound(roundMissed)">
            Die {{ roundMissed.length }} offenen nochmals üben
          </button>
          <button :class="{ primary: !roundMissed.length }" @click="startRound(allCards.map((_, i) => i), true)">
            Alle {{ allCards.length }} Karten nochmals
          </button>
        </div>

        <!-- Karten-Modus -->
        <template v-else-if="mode === 'cards' && current">
          <div
            class="card"
            :key="`${roundNo}-${pos}`"
            :class="{ flipped }"
            :style="cardStyle"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <div class="inner">
              <div class="face front">
                <span class="label">{{ reverse ? "Antwort" : "Frage" }}</span>
                <img v-if="questionImage" :src="questionImage" alt="" class="cardImg" referrerpolicy="no-referrer" draggable="false" />
                <p>{{ question }}</p>
              </div>
              <div class="face back">
                <span class="label">{{ reverse ? "Frage" : "Antwort" }}</span>
                <img v-if="answerImage" :src="answerImage" alt="" class="cardImg" referrerpolicy="no-referrer" draggable="false" />
                <p>{{ answer }}</p>
              </div>
            </div>
            <div
              class="stamp"
              :class="swipeHint.ok ? 'stampOk' : 'stampNo'"
              :style="{ opacity: swipeHint.strength }"
            >
              {{ swipeHint.ok ? "Kann ich" : "Noch nicht" }}
            </div>
          </div>
          <p class="tapHint">Tippen zum Umdrehen · nach rechts wischen = kann ich, nach links = noch nicht</p>

          <div class="rateRow">
            <button class="no" @click="swipeRate(false)">← Noch nicht</button>
            <button class="yes" @click="swipeRate(true)">Kann ich →</button>
          </div>
        </template>

        <!-- Schreib-Modus -->
        <template v-else-if="mode === 'write' && current">
          <div class="writeCard" :key="`${roundNo}-${pos}`">
            <span class="label">{{ reverse ? "Antwort" : "Frage" }}</span>
            <img v-if="questionImage" :src="questionImage" alt="" class="cardImg" referrerpolicy="no-referrer" />
            <p>{{ question }}</p>
          </div>
          <form class="writeForm" @submit.prevent="check()">
            <input
              ref="inputEl"
              v-model="typed"
              :readonly="!!checked"
              :class="checked"
              placeholder="Deine Antwort…"
              autocomplete="off"
              autocapitalize="off"
              enterkeyhint="done"
            />
            <button v-if="!checked" class="primary" type="submit">Prüfen</button>
          </form>
          <div v-if="checked" class="feedback" :class="checked">
            <p v-if="checked === 'right'" class="big">✓ Richtig!</p>
            <template v-else>
              <p class="big">✗ Nicht ganz.</p>
              <p>Richtig wäre: <strong>{{ answer }}</strong></p>
            </template>
            <img v-if="answerImage" :src="answerImage" alt="" class="cardImg" referrerpolicy="no-referrer" />
            <div class="rateRow">
              <button v-if="checked === 'wrong'" @click="next(true)">War doch richtig</button>
              <button class="primary" @click="next()">Weiter ↵</button>
            </div>
          </div>
        </template>

        <div class="tools">
          <button class="small" :disabled="!ratings.length" @click="undo()">↶ Rückgängig</button>
          <button class="small" :class="{ active: shuffleOn }" @click="toggleShuffle()">🔀 Mischen</button>
          <button class="small" :class="{ active: reverse }" @click="reverse = !reverse">⇄ Antwort zuerst</button>
          <button class="small" @click="resetProgress()">Fortschritt zurücksetzen</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  max-width: 36rem;
  padding: 2rem 1rem 0;
  box-sizing: border-box;
  font-size: 1rem;
}

.backLink {
  font-size: 0.85rem;
}

.modes {
  display: inline-flex;
  margin-top: 1rem;
  background: var(--bg-grey-mid);
  border-radius: 0.6rem;
  padding: 0.2rem;

  button {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    background: transparent;
    color: var(--font-inactive);

    &.on {
      background: var(--bg-white);
      color: var(--text);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--font-inactive);
  margin-top: 1rem;
}

.bar {
  height: 4px;
  background: var(--bg-grey-mid);
  border-radius: 2px;
  margin: 0.4rem 0 1.2rem;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: var(--cards-accent);
  transition: width 0.3s;
}

// ---------- Karte ----------
.card {
  position: relative;
  perspective: 1200px;
  height: 18rem;
  cursor: grab;
  user-select: none;
  touch-action: pan-y; // vertikal scrollen geht weiterhin
  -webkit-tap-highlight-color: transparent;

  &:active {
    cursor: grabbing;
  }
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.45s;
  transform-style: preserve-3d;
}
.card.flipped .inner {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 2rem 1.5rem 1.5rem;
  box-sizing: border-box;
  border-radius: 1rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow-y: auto;
}
.face p,
.writeCard p {
  margin: 0;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 500;
  white-space: pre-line;
}
.front {
  background: var(--bg-grey-mid);
}
.back {
  background: var(--bg-grey-outer);
  color: white;
  transform: rotateY(180deg);
}
.label {
  position: absolute;
  top: 0.8rem;
  left: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.5;
}
.cardImg {
  max-height: 9rem;
  width: auto;
  max-width: 100%;
  border-radius: 0.5rem;
  pointer-events: none;
}

.stamp {
  position: absolute;
  top: 1rem;
  padding: 0.3rem 0.8rem;
  border: 3px solid;
  border-radius: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.85);
}
.stampOk {
  left: 1rem;
  color: #1a9e55;
  transform: rotate(-12deg);
}
.stampNo {
  right: 1rem;
  color: #d23c3c;
  transform: rotate(12deg);
}

.tapHint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--font-inactive);
  margin: 0.6rem 0 1rem;
}

// ---------- Buttons ----------
button {
  font-family: inherit;
  font-size: 0.95rem;
  border: none;
  border-radius: 0.6rem;
  padding: 0.8rem 1rem;
  background: var(--bg-grey-mid);
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
}
.primary,
.yes {
  background: var(--cards-accent);
  color: white;
}

.rateRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}
.small {
  font-size: 0.75rem;
  padding: 0.4rem 0.7rem;
  background: transparent;
  border: 1px solid var(--bg-grey-mid);
  color: var(--font-inactive);

  &.active {
    border-color: var(--cards-accent);
    color: var(--cards-accent);
  }
}

// ---------- Rundenende ----------
.summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 2rem 0 0;
  text-align: center;

  p {
    margin: 0;
  }
  button {
    width: 100%;
    max-width: 22rem;
  }
}
.big {
  font-size: 1.3rem;
  font-weight: 600;
}
.ok {
  color: #1a9e55;
}
.nok {
  color: #d23c3c;
}

// ---------- Schreib-Modus ----------
.writeCard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  min-height: 9rem;
  justify-content: center;
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 1rem;
  background: var(--bg-grey-mid);
  text-align: center;
  box-sizing: border-box;
}
.writeForm {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  input {
    flex: 1;
    min-width: 0;
    font: inherit;
    font-size: 1rem;
    padding: 0.8rem 1rem;
    border: 2px solid var(--bg-grey-mid);
    border-radius: 0.6rem;
    outline: none;

    &:focus {
      border-color: var(--font-inactive);
    }
    &.right {
      border-color: #1a9e55;
    }
    &.wrong {
      border-color: #d23c3c;
    }
  }
}
.feedback {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  p {
    margin: 0;
  }
  &.right .big {
    color: #1a9e55;
  }
  &.wrong .big {
    color: #d23c3c;
  }
}

.hint {
  font-size: 0.85rem;
  color: var(--font-inactive);
}

@media (max-width: 480px) {
  .card {
    height: 20rem;
  }
}
</style>
