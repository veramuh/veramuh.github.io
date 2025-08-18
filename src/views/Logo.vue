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
}

.text {
  position: relative;
  left: 0.5rem;
  top: 24px;

}
.name {
  font-weight: 500;
  font-size: 1.9em;
}

.title{
  position: relative;
  left: 0.2rem;
  font-size: 1.4em;
  opacity: 0.6;
}

img {
  transform-origin: top left;
  width: 6rem;
  height: auto;
}
</style>
