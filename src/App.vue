<script setup lang="ts">
import Logo from './components/Logo.vue'


</script>

<template>
  <div class="outerWrap">
    <div class="portfolio">
      <div class="top">
        <Logo class="logo"></Logo>
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.logo {
  @extend .debug;
}

.outerWrap {
  @extend .debug;
  position: relative;
  display: flex;
  justify-content: center;
}

.portfolio {
  @extend .debug;
  background-color: var(--bg-grey-mid);
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
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: clamp(0.5rem, 1vw, 1.5rem);
  font-size: clamp(0.8rem, 1.2vw, 1.2rem);
  padding-left: 1rem;
}

@media (max-width: 600px) {
  nav {
    flex-direction: column;
    gap: 0.2rem;
    align-items: end;
  }
}

RouterView {
  @extend .debug;
}

.debug {
  border: 0px solid rgb(73, 135, 186);
}
</style>
