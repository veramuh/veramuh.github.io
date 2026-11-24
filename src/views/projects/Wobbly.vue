<script setup lang="ts">
import { ref } from 'vue';
const projectName = "Wobbly";
import texts from '../../assets/txts.json';
const lang = ref<'en'>('en');
import { useLightbox } from '../../composables/useLightbox'
const { currentImg, openLightbox, closeLightbox } = useLightbox()

// Medias
import concept01 from '../../assets/project-imgs/wobbly/concept01.jpg'
import concept02 from '../../assets/project-imgs/wobbly/concept02.jpg'
import aftermovie from '../../assets/project-imgs/wobbly/wobbly-lilu-aftermovie.mp4'
import aftermoviePoster from '../../assets/project-imgs/wobbly/wobbly-lilu-aftermovie-poster.jpg'
import prototype01 from '../../assets/project-imgs/wobbly/prototype01.mp4'
import prototype03 from '../../assets/project-imgs/wobbly/prototype03.mp4'
import storyboard01 from '../../assets/project-imgs/wobbly/storyboard01.jpg'
import styleWobblies01 from '../../assets/project-imgs/wobbly/style-wobblies01.jpg'
import kreiselwipp from '../../assets/project-imgs/wobbly/kreisel-wipp.gif'

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

      <video controls class="big-vid-contain" loop muted playsinline preload="none" :poster="aftermoviePoster"
        aria-label="Wobbly aftermovie, Lilu Light Festival Lucerne">
        <source :src="aftermovie" type="video/mp4" />
      </video>
      <div class="divider-small"></div>

      <div class="text">This is the aftermovie of "Wobbly", an interactive dance project that was shown at
        <span><a class="camouflagedLink" href='https://lichtfestivalluzern.ch' target="_blank">Lilu
            Lightfestival Lucerne</a></span> in January 2026.
      </div>
      <div class="divider-medium"></div>
      <div class="text">
        <h1 class="title">{{ texts.projects[projectName][lang].title }}</h1>
        <div class="subtitle">{{ texts.projects[projectName][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text1 }}</div>
        <div class="divider-medium"></div>
        <div class="big-img"><img :src="concept01" alt="Wobbly – concept of the interactive projection" loading="lazy" /></div>
        <div class="divider-large"></div>
        <h2 class="title">{{ texts.projects[projectName][lang].title2 }}</h2>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text2 }}</div>
        <div class="divider-small"></div>
        <div class="small-img-container">
          <div v-for="(img, i) in designImgs" :key="i" class="small-img" @click="openLightbox(img)">
            <img :src="img" :alt="`${texts.projects[projectName][lang].title} – image ${i + 1}`" loading="lazy" />
          </div>
        </div>
        <div class="divider-large"></div>
        <h2 class="title">{{ texts.projects[projectName][lang].title3 }}</h2>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[projectName][lang].text3 }}</div>
        <div class="divider-small"></div>
        <div class="small-img-container">
          <div v-for="(img, i) in conceptImgs" :key="i" class="small-img" @click="openLightbox(img)">
            <img :src="img" :alt="`${texts.projects[projectName][lang].title} – image ${i + 1}`" loading="lazy" />
          </div>
        </div>
        <div v-if="currentImg" class="lightbox" @click="closeLightbox">
          <img :src="currentImg" class="lightbox-img" alt="" />
        </div>
        <div class="divider-large"></div>
        <h2 class="title">{{ texts.projects[projectName][lang].title4 }}</h2>
        <div class="divider-line"></div>
        <div class="text" v-html="texts.projects[projectName][lang].text4"></div>
        <div class="divider-small"></div>
        <video controls class="big-vid" loop muted playsinline preload="metadata">
          <source :src="prototype01" type="video/mp4" />
        </video>
        <!-- <video controls class="big-vid" loop muted playsinline preload="metadata">
          <source :src="prototype02" type="video/mp4" />
        </video> -->
        <video controls class="big-vid" loop muted playsinline preload="metadata">
          <source :src="prototype03" type="video/mp4" />
        </video>
      </div>
      <div class="divider-large"></div>
      <h2 class="title">{{ texts.projects[projectName][lang].creditsTitle }}</h2>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit1 }}</div>
          <div class="text"><a class="camouflagedLink" href='https://fusion-robot.ch' target="_blank">Beat Kunz</a>
          </div>
        </div>
        <div class=" divider-small"> </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit2 }}</div>
          <div class="text">Vera Müller</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[projectName][lang].credit3 }}</div>
          <div class="text">
            <a class="camouflagedLink" href='https://www.andibissig.com/' target="_blank">Andi Bissig</a>
          </div>
        </div>
      </div>
      <div class=" divider-small">
      </div>
      <a class="text" :href="texts.projects[projectName][lang].linkUrl" target="_blank">{{
        texts.projects[projectName][lang].linkText }}</a>
    </div>
    <div class=" divider-small">
    </div>
    <img class="kreisel" :src="kreiselwipp" alt="" loading="lazy" />
  </div>
</template>

<style lang="scss" scoped>
.kreisel {
  width: 8vh;
}
</style>