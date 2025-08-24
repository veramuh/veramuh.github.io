<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import ProjectTile from '../components/ProjectTile.vue';
const lang = ref<'en' | 'de'>('en')

// Images //
import project1Img from '../assets/project-imgs/lilu26/lilu-sketch.jpg';
import project2Img from '../assets/project-imgs/jetpack-marshmallow/jetpack-marshmallow.jpg';
import project3Img from '../assets/project-imgs/hungry-frog/hungry-frog0.png'

</script>

<template>
  <div class="page">
    <!-- <ProjectTile :border="1" link="/project-template" :title="texts.projects.projectTemplate[lang].title"
      :subtitle="texts.projects.projectTemplate[lang].subtitle" :image="project1Img">
    </ProjectTile> -->
    <!-- <ProjectTile :border="1" link="/wobbly-x-lilu" :title="texts.projects.Lilu26[lang].title"
      :subtitle="texts.projects.Lilu26[lang].subtitle" :image="project1Img">
    </ProjectTile> -->
    <ProjectTile :border="0" link="/jetpack-marshmallow" :title="texts.projects.jetpackMarshmallow[lang].title"
      :subtitle="texts.projects.jetpackMarshmallow[lang].subtitle" :image="project2Img">
    </ProjectTile>
    <ProjectTile :border="0" link="/hungry-frog" :title="texts.projects.hungryFrog[lang].title"
      :subtitle="texts.projects.hungryFrog[lang].subtitle" :image="project3Img">
    </ProjectTile>
  </div>
</template>