<script setup lang="ts">
import jetpackImg from '../assets/project-imgs/jetpack-marshmallow.jpg';
import testImg from '../assets/project-imgs/lilu26/lilu-sketch.jpg';
import ProjectTile from '../components/ProjectTile.vue';
</script>

<template>
  <div class="page">
    <ProjectTile link="/lilu26" title="Projektname" subtitle="Untertitel" :image="jetpackImg">
    </ProjectTile>
    <ProjectTile :border="1" link="/lilu26" title="Projektname" subtitle="Untertitel" :image="testImg">
    </ProjectTile>
    <ProjectTile link="/lilu26" title="Projektname" subtitle="Untertitel" :image="jetpackImg">
    </ProjectTile>
  </div>
</template>

<style lang="scss" scoped>
.page {
  color: black;
  margin-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--bg-white);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6rem;
  z-index: 1;
}
</style>
