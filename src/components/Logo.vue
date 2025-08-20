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
  width: 100%;
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
  font-size: 1.1rem;
}

.portfolio {
  position: relative;
  font-weight: 200;
  font-size: 0.9rem;
  color: var(--font-inactive);
}

img {
  transform-origin: top left;
  width: 4rem;
  height: auto;
}
</style>
