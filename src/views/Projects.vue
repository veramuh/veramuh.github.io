<script setup lang="ts">
</script>

<template>
  <div class="page">
    <img src="/layout/projects.png">
    <h1>projects</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
  </div>
</template>

<style lang="scss" scoped>
.page {
  margin-top: 2rem;
  background-color: var(--bg-white);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
