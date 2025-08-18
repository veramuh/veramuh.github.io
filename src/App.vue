<script setup lang="ts">
import Logo from './views/Logo.vue'

</script>

<template>
<div class="portfolio">
<Logo></Logo>
  <nav>
    <div class="menu">
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/playground">Playground</RouterLink>
    <RouterLink to="/about">About</RouterLink></div>
  </nav>
   <RouterView />
</div>
</template>

<style lang="scss">

.portfolio {
  margin-left: 1.8rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  margin-right: 2rem;
}

.menu {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  left: 0;
  right: 0;
  top: 3.4em;
  gap: 1.3rem;
  font-size: 1.9em;
  padding-right: 2.5rem;
  padding-left: 1rem;
}
</style>

