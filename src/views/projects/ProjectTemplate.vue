<script setup lang="ts">
import { ref } from 'vue';
const projectName = "projectTemplate";
import texts from '../../assets/txts.json';
const lang = ref<'en' | 'de'>('en');
import { useLightbox } from '../../composables/useLightbox'
const { currentImg, openLightbox, closeLightbox } = useLightbox()

// Medias
import testImg from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow.jpg'

const smallImgs = [
  testImg, testImg, testImg, testImg,
];
</script>

<template>
  <div class="page">
    <div class="center">
      <div class="big-img"><img :src="testImg"></img></div>
      <!-- <video class="big-vid" autoplay loop muted playsinline>
        <source :src="testVid" type="video/mp4" />
      </video> -->
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">{{ texts.projects[projectName][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[projectName][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text }}</div>
        <div class="divider-small"></div>
        <a :href="texts.projects[projectName][lang].linkUrl" target="_blank">{{
          texts.projects[projectName][lang].linkText }}</a>
      </div>
      <div class="divider-small"></div>
      <div class="small-img-container">
        <div v-for="(img, i) in smallImgs" :key="i" class="small-img" @click="openLightbox(img)">
          <img :src="img" />
        </div>
      </div>
      <div v-if="currentImg" class="lightbox" @click="closeLightbox">
        <img :src="currentImg" class="lightbox-img" />
      </div>
      <div class="divider-big"></div>
      <div class="title">Credits</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle1 }}</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle2 }}</div>
          <div class="text">Name Surname</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle3 }}</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle4 }}</div>
          <div class="text">Name Surname</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>