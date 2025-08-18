<script setup lang="ts">
import Logo from './views/Logo.vue'


</script>

<template>
  <div class="outerWrap">
    <div class="portfolio">
      <div class="top">
        <Logo></Logo>
        <nav>
          <RouterLink to="/projects">Projects</RouterLink>
          <RouterLink to="/playground">Playground</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
.outerWrap {
  @extend .debug;
  position: relative;
  display: flex;
  justify-content: center;
}

.portfolio {
  @extend .debug;
  background-color: var(--bg-grey);
  min-width: 30rem;
  max-width: 60rem;
  width: 70vw;
  padding-left: 2rem;
  padding-top: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}

.top {
  @extend .debug;
  display: flex;
  justify-content: space-between;
}

nav {
  @extend .debug;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: clamp(0.8rem, 1vw, 1.5em);
  font-size: clamp(1rem, 2vw, 2em);
  padding-left: 1rem;
}

RouterView {
  @extend .debug;
}

.debug {
  border: 0px solid rgb(73, 135, 186);
}
</style>
