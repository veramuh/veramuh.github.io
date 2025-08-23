<script setup lang="ts">
import { ref } from 'vue';
import frog1 from '../../assets/project-imgs/hungry-frog/hungry-frog1.png'
import frog2 from '../../assets/project-imgs/hungry-frog/hungry-frog2.png'
import frog3 from '../../assets/project-imgs/hungry-frog/hungry-frog3.png'
import frog4 from '../../assets/project-imgs/hungry-frog/hungry-frog4.png'
import frog5 from '../../assets/project-imgs/hungry-frog/hungry-frog5.png'
import frogVid from '../../assets/project-imgs/hungry-frog/hungry-frog.mp4'
import texts from '../../assets/txts.json';
const project = "hungryFrog";
const lang = ref<'en' | 'de'>('en')
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
        <div class="title">{{ texts.projects[project][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[project][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text" v-html="texts.projects[project][lang].text"></div>
        <div class="divider-small"></div>
        <a :href="texts.projects[project][lang].linkUrl" target="_blank">{{
          texts.projects[project][lang].linkText }}</a>
      </div>
      <div class="divider-small"></div>
      <div class="small-img-container">
        <div class="small-img"><img :src="frog1"></img></div>
        <div class="small-img"><img :src="frog2"></img></div>
        <div class="small-img"><img :src="frog3"></img></div>
        <div class="small-img"><img :src="frog5"></img></div>
      </div>
      <div class="divider-big"></div>
      <div class="title">Credits</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle1 }}</div>
          <div class="text">Vera Müller</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle2 }}</div>
          <a href="https://sfxr.me/" target="_blank" class="text">sfxr</a>
        </div>
      </div>
    </div>
  </div>
</template>