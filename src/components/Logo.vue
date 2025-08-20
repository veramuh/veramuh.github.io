<script setup lang="ts">

</script>

<template>
  <div class="logo" @click="$router.push('/projects')">
    <img src="/tierli.svg" />
    <div class=" text">
      <div class="name">Vera Müller</div>
      <div class="portfolio">Portfolio</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.text {
  padding-left: 0.4rem;
  left: 0.5rem;
  top: 0;
  user-select: none;
}

.name {
  white-space: nowrap;
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
