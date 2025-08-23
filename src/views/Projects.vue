<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import ProjectTile from '../components/ProjectTile.vue';
const lang = ref<'en' | 'de'>('en')

// Images //
import jetpackImg from '../assets/project-imgs/jetpack-marshmallow.jpg';
import testImg from '../assets/project-imgs/lilu26/lilu-sketch.jpg';
import frog0 from '../assets/project-imgs/hungry-frog/hungry-frog0.png'

</script>

<template>
  <div class="page">
    <ProjectTile :border="0" link="/project-template" :title="texts.projectOverview[lang].title3"
      :subtitle="texts.projectOverview[lang].subtitle3" :image="jetpackImg">
    </ProjectTile>
    <ProjectTile :border="1" link="/project-template" :title="texts.projectOverview[lang].title2"
      :subtitle="texts.projectOverview[lang].subtitle2" :image="testImg">
    </ProjectTile>
    <ProjectTile :border="0" link="/hungry-frog" :title="texts.projects.hungryFrog[lang].title"
      :subtitle="texts.projects.hungryFrog[lang].subtitle" :image="frog0">
    </ProjectTile>
  </div>
</template>