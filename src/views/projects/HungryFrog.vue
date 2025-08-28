<script setup lang="ts">
import { ref } from 'vue';
const projectName = "hungryFrog";
import texts from '../../assets/txts.json';
const lang = ref<'en'>('en');
import { useLightbox } from '../../composables/useLightbox'
const { currentImg, openLightbox, closeLightbox } = useLightbox()

// Medias
import frog1 from '../../assets/project-imgs/hungry-frog/hungry-frog1.png'
import frog2 from '../../assets/project-imgs/hungry-frog/hungry-frog2.png'
import frog3 from '../../assets/project-imgs/hungry-frog/hungry-frog3.png'
import frog5 from '../../assets/project-imgs/hungry-frog/hungry-frog5.png'
import frogVid from '../../assets/project-imgs/hungry-frog/hungry-frog.mp4'

const smallImgs = [
  frog1, frog2, frog3, frog5,
];
</script>

<template>
  <div class="page">
    <div class="center">
      <!-- <div class="big-img"><img :src="frog1"></img></div> -->
      <video class="big-vid" autoplay loop muted playsinline>
        <source :src="frogVid" type="video/mp4" />
      </video>
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">{{ texts.projects[projectName][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[projectName][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text" v-html="texts.projects[projectName][lang].text"></div>
        <div class="divider-small"></div>
        <!-- <a :href="texts.projects[projectName][lang].linkUrl" target="_blank">{{
          texts.projects[projectName][lang].linkText }}</a><br> -->

        <!-- TODO self host instead of iframe -->
        <!-- TODO maybe fix sound on mobile -->
        <iframe src="https://editor.p5js.org/vera-mueller/full/ixxFsuXYA"></iframe>
        <a :href="texts.projects[projectName][lang].linkUrl2" target="_blank">{{
          texts.projects[projectName][lang].linkText2 }}</a>

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
      <div class="title">{{ texts.projects[projectName][lang].creditsTitle }}</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit1 }}</div>
          <div class="text">Vera Müller</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit2 }}</div>
          <a href="https://sfxr.me/" target="_blank" class="text">jsfxr</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  border: none;

  width: 40vw;
  min-width: 300px;
  max-width: 700px;
  height: 50vh;
}
</style>