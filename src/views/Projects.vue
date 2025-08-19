<script setup lang="ts">
import jetpackImg from '../assets/project-imgs/jetpack-marshmallow.jpg';
import liluImg from '../assets/project-imgs/lilu2025.jpg';
import Project from '../components/ProjectTile.vue';
</script>

<template>
  <div class="page">
    <img src="/layout/projects.png">
    <Project link="/lilu26" title="Projektname" subtitle="Untertitel" :image="jetpackImg">
    </Project>
    <Project :border="1" link="/lilu26" title="Projektname" subtitle="Untertitel" :image="liluImg">
    </Project>
    <Project link="/lilu26" title="Projektname" subtitle="Untertitel" :image="jetpackImg">
    </Project>
  </div>
</template>

<style lang="scss" scoped>
.page {
  color: black;
  margin-top: 2rem;
  background-color: var(--bg-white);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 6rem;
}

img {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transform-origin: top left;
  width: 900px;
  height: auto;
  z-index: 2;
  pointer-events: none;
}
</style>
