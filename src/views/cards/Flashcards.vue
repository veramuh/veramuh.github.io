<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { loadTopics, loadCards, type Card, type Topic } from "../../cards/sheet";

const route = useRoute();
const slug = route.params.topic as string;
const STORAGE_KEY = `cards-known-${slug}`;

const topic = ref<Topic | null>(null);
const allCards = ref<Card[]>([]);
const order = ref<number[]>([]); // Indizes in allCards
const pos = ref(0);
const flipped = ref(false);
const known = ref<Set<string>>(new Set());
const onlyUnknown = ref(false);
const loading = ref(true);
const error = ref("");

const keyOf = (c: Card) => c.front;

const deck = computed(() =>
  order.value.filter((i) => !onlyUnknown.value || !known.value.has(keyOf(allCards.value[i])))
);
const current = computed(() => {
  const i = deck.value[pos.value];
  return i === undefined ? null : allCards.value[i];
});
const knownCount = computed(() => allCards.value.filter((c) => known.value.has(keyOf(c))).length);

function loadKnown() {
  try {
    known.value = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    known.value = new Set();
  }
}
function saveKnown() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...known.value]));
  } catch {
    /* ignore */
  }
}

function go(delta: number) {
  const n = deck.value.length;
  if (!n) return;
  flipped.value = false;
  pos.value = (pos.value + delta + n) % n;
}

function mark(isKnown: boolean) {
  const c = current.value;
  if (!c) return;
  const s = new Set(known.value);
  isKnown ? s.add(keyOf(c)) : s.delete(keyOf(c));
  known.value = s;
  saveKnown();
  flipped.value = false;
  // Im Filter-Modus verschwindet die gekonnte Karte; Position bleibt dann gleich
  if (onlyUnknown.value && isKnown) {
    if (pos.value >= deck.value.length) pos.value = 0;
  } else go(1);
}

function shuffle() {
  const a = [...order.value];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  order.value = a;
  pos.value = 0;
  flipped.value = false;
}

function toggleFilter() {
  onlyUnknown.value = !onlyUnknown.value;
  pos.value = 0;
  flipped.value = false;
}

function resetProgress() {
  known.value = new Set();
  saveKnown();
  pos.value = 0;
  flipped.value = false;
}

function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowRight") go(1);
  else if (e.key === "ArrowLeft") go(-1);
  else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    flipped.value = !flipped.value;
  }
}

// Wischen auf dem Handy
let touchX = 0;
let swiped = false;
function onTouchStart(e: TouchEvent) {
  touchX = e.touches[0].clientX;
  swiped = false;
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) {
    swiped = true;
    go(dx < 0 ? 1 : -1);
  }
}
function onCardClick() {
  if (swiped) return;
  flipped.value = !flipped.value;
}

onMounted(async () => {
  window.addEventListener("keydown", onKey);
  loadKnown();
  try {
    const topics = await loadTopics();
    topic.value = topics.find((t) => t.slug === slug) ?? null;
    if (!topic.value) throw new Error("Dieses Thema gibt es nicht.");
    allCards.value = await loadCards(topic.value.tab);
    order.value = allCards.value.map((_, i) => i);
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
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
        <div class="meta">
          <span>{{ deck.length ? pos + 1 : 0 }} / {{ deck.length }}</span>
          <span>{{ knownCount }} von {{ allCards.length }} gekonnt</span>
        </div>
        <div class="bar"><div class="fill" :style="{ width: (knownCount / allCards.length) * 100 + '%' }"></div></div>

        <div v-if="!current" class="done">
          <p>🎉 Du kannst alle Karten!</p>
          <button @click="resetProgress">Nochmals von vorne</button>
        </div>

        <template v-else>
          <div
            class="card"
            :key="deck[pos]"
            :class="{ flipped }"
            @click="onCardClick"
            @touchstart.passive="onTouchStart"
            @touchend="onTouchEnd"
          >
            <div class="inner">
              <div class="face front">
                <span class="label">Frage</span>
                <p>{{ current.front }}</p>
              </div>
              <div class="face back">
                <span class="label">Antwort</span>
                <p>{{ current.back }}</p>
              </div>
            </div>
          </div>
          <p class="tapHint">Tippen zum Umdrehen · Wischen oder ← → zum Blättern</p>

          <div class="nav">
            <button class="prev" @click="go(-1)" aria-label="Vorherige Karte">←</button>
            <button class="no" @click="mark(false)">Noch nicht</button>
            <button class="yes" @click="mark(true)">Kann ich</button>
            <button class="next" @click="go(1)" aria-label="Nächste Karte">→</button>
          </div>
        </template>

        <div class="tools">
          <button class="small" @click="shuffle">🔀 Mischen</button>
          <button class="small" :class="{ active: onlyUnknown }" @click="toggleFilter">Nur ungekonnte</button>
          <button class="small" @click="resetProgress">Fortschritt zurücksetzen</button>
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
  background: var(--red);
  transition: width 0.3s;
}

.card {
  perspective: 1200px;
  height: 16rem;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 1rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow-y: auto;

  p {
    margin: 0;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    font-weight: 500;
    white-space: pre-line;
  }
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

.tapHint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--font-inactive);
  margin: 0.6rem 0 1rem;
}

button {
  font-family: inherit;
  font-size: 0.95rem;
  border: none;
  border-radius: 0.6rem;
  padding: 0.7rem 1rem;
  background: var(--bg-grey-mid);
  color: var(--text);
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
}

.nav {
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  grid-template-areas: "prev no yes next";
  gap: 0.5rem;

  button {
    white-space: nowrap;
  }
  .prev { grid-area: prev; }
  .no { grid-area: no; }
  .yes { grid-area: yes; }
  .next { grid-area: next; }
}

// Schmale Handys: Bewertung gross oben, Blättern darunter
@media (max-width: 480px) {
  .nav {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "no yes"
      "prev next";

    .no,
    .yes {
      padding: 1rem 0.5rem;
    }
    .prev,
    .next {
      padding: 0.5rem;
      background: transparent;
      border: 1px solid var(--bg-grey-mid);
    }
  }
}
.yes {
  background: var(--red);
  color: white;
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
    border-color: var(--red);
    color: var(--red);
  }
}

.done {
  text-align: center;
  padding: 2rem 0;
}

.hint {
  font-size: 0.85rem;
  color: var(--font-inactive);
}
</style>
