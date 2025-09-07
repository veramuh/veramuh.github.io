<script setup lang="ts">
import Logo from './components/Logo.vue'


function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <BlankLayout v-if="$route.meta.layout === 'blank'">
    <RouterView />
  </BlankLayout>
  <div class="outerWrap" v-else>
    <div class="portfolio">
      <div class="top">
        <Logo class="logo"></Logo>
        <nav>
          <RouterLink to="/projects">Projects</RouterLink>
          <!-- <RouterLink to="/playground">Playground</RouterLink> -->
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <RouterView />
      <div class="backToTop" @click="scrollToTop">⌃
        <span class="tooltip">up</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.outerWrap {
  @extend .debug;
  position: relative;
  display: flex;
  justify-content: center;
}

.portfolio {
  @extend .debug;
  background-color: var(--bg-grey-mid);
  max-width: 60rem;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}

.top {
  @extend .debug;
  display: flex;
  justify-content: space-between;
}

.logo {
  @extend .debug;
}

.router-link-active {
  color: var(--font-active);
}

a {
  text-decoration: none;
}

nav {
  @extend .debug;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1vw, 1.5rem);
  font-size: clamp(0.8rem, 1.2vw, 1.2rem);
  padding-left: 1rem;
}

@media (max-width: 450px) {
  nav {
    flex-direction: column;
    gap: 0.2rem;
    align-items: end;
  }

  .portfolio {
    padding: 1rem;
  }
}

RouterView {
  @extend .debug;
}

.backToTop {
  position: relative;
  opacity: 0.3;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  color: var(--bg-grey-outer);
  cursor: pointer;
}

.backToTop:hover .tooltip {
  visibility: visible;
}

.tooltip {
  position: absolute;
  visibility: hidden;
  display: inline-block;
  font-weight: 200;
  font-size: 0.8rem;
  transform: translateX(110%) translateY(20%);
  z-index: 20;
}

.debug {
  border: 0px solid rgb(73, 135, 186);
}
</style>
