<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import me from '../assets/vera-01.png';

const first = "hey.vera";
const last = "mueller";
const domain = "gmail";
const suffix = "com";
const snd = ref('');
const href = ref('#');
const lang = ref<'en' | 'de'>('en')

function mailcombi() {
  snd.value = `${first}.${last}@${domain}.${suffix}`;
  href.value = `mailto:${snd.value}`;
}
</script>

<template>
  <div class="page">
    <div class="about">
      <img :src="me" alt="vera">
      <div class="textblock">
        <div class="title">{{ texts.about[lang].title }}</div>
        <div class="subtitle">{{ texts.about[lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.about[lang].text }}</div>
        <div class="divider-small"></div>
        <a :href="href" target="_blank" @click="mailcombi">{{ snd || texts.about[lang].contact }}</a>
      </div>
      <div class="divider-medium"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  margin-top: 2rem;
  background-color: var(--bg-white);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about {
  padding-top: 2rem;
  width: 35vw;
  max-width: 800px;
  min-width: 350px;
  height: auto;
}

img {
  width: 100%;
  height: auto;
}

.textblock {
  padding-top: 1.5rem;
}
</style>
