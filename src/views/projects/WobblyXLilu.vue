<script setup lang="ts">
import { ref } from 'vue';
const projectName = "WobblyXLilu";
import texts from '../../assets/txts.json';
const lang = ref<'en' | 'de'>('en');
import { useLightbox } from '../../composables/useLightbox'
const { currentImg, openLightbox, closeLightbox } = useLightbox()

// Medias
import concept01 from '../../assets/project-imgs/wobblyXlilu/concept01.jpg'
import concept02 from '../../assets/project-imgs/wobblyXlilu/concept02.jpg'
// import concept03 from '../../assets/project-imgs/wobblyXlilu/concept03.gif'
// import maskottchen01 from '../../assets/project-imgs/wobblyXlilu/maskottchen01.png'
import prototype01 from '../../assets/project-imgs/wobblyXlilu/prototype01.mp4'
import prototype02 from '../../assets/project-imgs/wobblyXlilu/prototype02.mp4'
import prototype03 from '../../assets/project-imgs/wobblyXlilu/prototype03.mp4'
import storyboard01 from '../../assets/project-imgs/wobblyXlilu/storyboard01.jpg'
import styleWobblies01 from '../../assets/project-imgs/wobblyXlilu/style-wobblies01.jpg'

const conceptImgs = [
  concept01, concept02
];
const designImgs = [
  storyboard01, styleWobblies01,
];
</script>

<template>
  <div class="page">
    <div class="center">
      <div class="big-img"><img :src="concept01"></img></div>
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">{{ texts.projects[projectName][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[projectName][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text1 }}</div>
        <div class="divider-big"></div>
        <div class="title">{{ texts.projects[projectName][lang].title2 }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text2 }}</div>
        <div class="divider-small"></div>
        <div class="small-img-container">
          <div v-for="(img, i) in designImgs" :key="i" class="small-img" @click="openLightbox(img)">
            <img :src="img" />
          </div>
        </div>
        <div class="divider-big"></div>
        <div class="title">{{ texts.projects[projectName][lang].title3 }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text3 }}</div>
        <div class="divider-small"></div>
        <div class="small-img-container">
          <div v-for="(img, i) in conceptImgs" :key="i" class="small-img" @click="openLightbox(img)">
            <img :src="img" />
          </div>
        </div>
        <div v-if="currentImg" class="lightbox" @click="closeLightbox">
          <img :src="currentImg" class="lightbox-img" />
        </div>
        <div class="divider-big"></div>
        <div class="title">{{ texts.projects[projectName][lang].title4 }}</div>
        <div class="divider-line"></div>
        <div class="text" v-html="texts.projects[projectName][lang].text4"></div>
        <div class="divider-small"></div>
        <video controls class="big-vid" loop muted playsinline>
          <source :src="prototype01" type="video/mp4" />
        </video><video controls class="big-vid" loop muted playsinline>
          <source :src="prototype02" type="video/mp4" />
        </video><video controls class="big-vid" loop muted playsinline>
          <source :src="prototype03" type="video/mp4" />
        </video>
      </div>
      <div class="divider-medium"></div>
      <div class="title">{{ texts.projects[projectName][lang].creditsTitle }}</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit1 }}</div>
          <div class="text">Vera Müller</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit2 }}</div>
          <div class="text"><a class="camouflagedLink" href='https://fusion-robot.ch' target=" _blank">Beat Kunz</a>
          </div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit3 }}</div>
          <div class="text">
            <a class="camouflagedLink" href='https://fusion-robot.ch' target=" _blank">Beat Kunz</a>
            <span> & Vera Müller</span>
          </div>
        </div>
      </div>
      <div class=" divider-small">
      </div>
      <a class="text" :href="texts.projects[projectName][lang].linkUrl" target="_blank">{{
        texts.projects[projectName][lang].linkText }}</a>
    </div>

  </div>
</template>

<style lang="scss" scoped></style>