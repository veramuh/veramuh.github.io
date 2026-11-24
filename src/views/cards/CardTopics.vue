<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadTopics, isDemo, type Topic } from "../../cards/sheet";

const topics = ref<Topic[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    topics.value = await loadTopics();
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page">
    <div class="wrap">
      <h1 class="title">Lernkarten</h1>
      <p v-if="isDemo()" class="hint">Demo-Modus: In <code>src/cards/sheet.ts</code> ist noch keine SHEET_ID eingetragen.</p>
      <p v-if="loading" class="subtitle">Lade Themen…</p>
      <p v-else-if="error" class="hint">{{ error }}</p>
      <p v-else-if="!topics.length" class="hint">Noch keine Themen. Trage im Tab „Themen“ in Spalte A die Namen deiner Themen-Tabs ein.</p>
      <div v-else class="topics">
        <RouterLink v-for="t in topics" :key="t.slug" :to="`/cards/${t.slug}`" class="topic camouflagedLink">
          {{ t.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  max-width: 36rem;
  padding: 2rem 1rem 0;
  box-sizing: border-box;
}

.topics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.topic {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--bg-grey-mid);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

.hint {
  font-size: 0.85rem;
  color: var(--font-inactive);
}
</style>
