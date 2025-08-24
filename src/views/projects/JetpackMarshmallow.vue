<script setup lang="ts">
import { ref } from 'vue';
const projectName = "jetpackMarshmallow";
import texts from '../../assets/txts.json';
const lang = ref<'en' | 'de'>('en');
import { useLightbox } from '../../composables/useLightbox'
const { currentImg, openLightbox, closeLightbox } = useLightbox()

// Medias
import jetpackMarshmallowVid from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow.mp4'
import jetpackMarshmallowMobile from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow.jpg'
// import jetpackMarshmallowGame01 from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow-game01.jpg'
import jetpackMarshmallowGame02 from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow-game02.jpg'
import jetpackMarshmallowExplode from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow-explode.jpg'
import jetpackMarshmallowTryAgain01 from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow-try-again01.jpg'
// import jetpackMarshmallowTryAgain02 from '../../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow-try-again02.jpg'

const smallImgs = [
  jetpackMarshmallowMobile, jetpackMarshmallowGame02, jetpackMarshmallowExplode, jetpackMarshmallowTryAgain01
];
</script>

<template>
  <div class="page">
    <div class="center">
      <!-- <div class="big-img"><img :src="jetpackMarshmallowMobile"></img></div> -->
      <video class="big-vid" autoplay loop muted playsinline>
        <source :src="jetpackMarshmallowVid" type="video/mp4" />
      </video>
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">{{ texts.projects[projectName][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[projectName][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text" v-html="texts.projects[projectName][lang].text"></div>
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
          <div class="text">Vera Müller</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle2 }}</div>
          <a href="https://suno.com/" target="_blank" class="text">Suno</a>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].creditTitle3 }}</div>
          <a href="https://sfxr.me/" target="_blank" class="text">jsfxr</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>