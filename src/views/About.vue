<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import me from '../assets/about/vera-01.png';

const first = "hey.vera";
const last = "mueller";
const domain = "gmail";
const suffix = "com";
const snd = ref('');
const href = ref('#');
const lang = ref<'en'>('en');

function mailcombi() {
  snd.value = `${first}.${last}@${domain}.${suffix}`;
  href.value = `mailto:${snd.value}`;
}
</script>

<template>
  <div class="page">
    <div class="center">
      <div class="about">
        <img :src="me" alt="vera">
        <div class="divider-small"></div>
        <div class="textblock">
          <div class="title">{{ texts.about[lang].title }}</div>
          <div class="subtitle">{{ texts.about[lang].subtitle }}</div>
          <div class="divider-line"></div>
          <div class="text">{{ texts.about[lang].text }}</div>
          <div class="divider-small"></div>
          <a :href="href" class="text" target="_blank" @click="mailcombi">{{ snd || texts.about[lang].contact }}</a>
        </div>
        <div class="divider-medium"></div>
      </div>
    </div>
  </div>
</template>
