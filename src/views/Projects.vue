<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import ProjectTile from '../components/ProjectTile.vue';
// const lang = ref<'en' | 'de'>('en')
const lang = ref<'en'>('en');

// Images //
import wobblyTitle from '../assets/project-imgs/wobbly/wobbly-img.jpg';
// import wobblyTitle from '../assets/project-imgs/wobbly/wobbly-lilu-thumb.png';
import marshmallowTitle from '../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow.jpg';
import frogTitle from '../assets/project-imgs/hungry-frog/hungry-frog0.png'
// import klickTitle from '../assets/project-imgs/klick/klick01.jpg'


</script>

<template>
  <div class="page">
    <h1 class="visually-hidden">Vera Müller – Portfolio: Motion Design, Code, Animation, Game Design</h1>
    <!-- <ProjectTile :border="1" link="/project-template" :title="texts.projects.projectTemplate[lang].title"
      :subtitle="texts.projects.projectTemplate[lang].subtitle" :image="project1Img">
    </ProjectTile> -->
    <!-- <ProjectTile :border="1" link="/klick" :title="texts.projects.Klick[lang].title"
      :subtitle="texts.projects.Klick[lang].subtitle" :image="klickTitle">
    </ProjectTile> -->
    <ProjectTile :border="1" link="/wobbly" :title="texts.projects.Wobbly[lang].title"
      :subtitle="texts.projects.Wobbly[lang].subtitle" :image="wobblyTitle">
    </ProjectTile>
    <ProjectTile :border="0" link="/jetpack-marshmallow" :title="texts.projects.jetpackMarshmallow[lang].title"
      :subtitle="texts.projects.jetpackMarshmallow[lang].subtitle" :image="marshmallowTitle">
    </ProjectTile>
    <ProjectTile :border="0" link="/hungry-frog" :title="texts.projects.hungryFrog[lang].title"
      :subtitle="texts.projects.hungryFrog[lang].subtitle" :image="frogTitle">
    </ProjectTile>
  </div>
</template>