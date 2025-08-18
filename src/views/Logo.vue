<script setup lang="ts">

</script>

<template>
  <div class="logo">
  <img src="/tierli.svg">
  <div class="text">
  <div class="name">Vera Müller</div>
  <div class="title">Portfolio</div>
  </div>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
}

.text {
  position: relative;
  left: 0.5rem;
  top: 0;

}
.name {
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 2em);
}

.title{
  position: relative;
  font-size: 1.4em;
  opacity: 0.6;
}

img {
  transform-origin: top left;
  width: 6rem;
  height: auto;
}
</style>
