<script setup lang="ts">
import { ref } from 'vue';
import texts from '../assets/txts.json'
import ProjectTile from '../components/ProjectTile.vue';
const lang = ref<'en' | 'de'>('en')

// Images //
import jetpackImg from '../assets/project-imgs/jetpack-marshmallow.jpg';
import testImg from '../assets/project-imgs/lilu26/lilu-sketch.jpg';
</script>

<template>
  <div class="page">
    <ProjectTile :border="0" link="/project-template" :title="texts.projectOverview[lang].title1"
      :subtitle="texts.projectOverview[lang].subtitle1" :image="jetpackImg">
    </ProjectTile>
    <ProjectTile :border="1" link="/project-template" :title="texts.projectOverview[lang].title1"
      :subtitle="texts.projectOverview[lang].subtitle1" :image="testImg">
    </ProjectTile>
    <ProjectTile :border="0" link="/project-template" :title="texts.projectOverview[lang].title1"
      :subtitle="texts.projectOverview[lang].subtitle1" :image="jetpackImg">
    </ProjectTile>
  </div>
</template>