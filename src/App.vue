<script setup lang="ts">
import Logo from './views/Logo.vue'

</script>

<template>
<div class="portfolio">
  <Logo></Logo>
  <nav>
    <div class="menu">
    <RouterLink to="/projects">Projects</RouterLink> |
    <RouterLink to="/playground">Playground</RouterLink> |
    <RouterLink to="/about">About</RouterLink></div>
    <RouterView />
  </nav>
</div>
</template>

<style lang="scss">
.portfolio {
  margin-left: 2em;
  margin-top: 3em;
  margin-right: 2em;
  margin-bottom: 2em;
}

.menu {
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5em;
}
</style>

