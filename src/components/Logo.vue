<script setup lang="ts">

</script>

<template>
  <div class="logo">
    <img src=" /tierli.svg" @click="$router.push('/projects')" />
    <div class=" text">
      <div class="name">Vera Müller</div>
      <div class="portfolio">Portfolio</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
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

.portfolio {
  position: relative;
  font-weight: 200;
  font-size: clamp(1rem, 1.7vw, 2em);
  color: var(--font-inactive);
}

img {
  transform-origin: top left;
  width: 6rem;
  height: auto;
}
</style>
