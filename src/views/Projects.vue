<script setup lang="ts">
import jetpackImg from '../assets/project-imgs/jetpack-marshmallow.jpg';
import testImg from '../assets/project-imgs/lilu26/lilu-sketch.jpg';
import ProjectTile from '../components/ProjectTile.vue';
</script>

<template>
  <div class="page">
    <ProjectTile link="/project-template" title="Project Name" subtitle="Subtitle" :image="jetpackImg">
    </ProjectTile>
    <ProjectTile :border="1" link="/project-template" title="Project Name" subtitle="Subtitle" :image="testImg">
    </ProjectTile>
    <ProjectTile link="/project-template" title="Project Name" subtitle="Subtitle" :image="jetpackImg">
    </ProjectTile>
  </div>
</template>

<style lang="scss" scoped></style>
