<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function openGame() {
  console.log("hoi");
  let params = `width=200,height=200,left=800,top=300,`;
  const url = router.resolve('/klick-popup').href
  window.open(url, 'hoi', params)
}
</script>


<template>
  <div class="page">
    <div class="center">
      <button @click="openGame">Hello</button>
      <div class="divider-medium"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  padding: 15px 32px;
  font-size: large;
}

.page {
  @extend .debug;
}

.center {
  @extend .debug;
  display: flex;
  justify-content: center;
}

button {
  @extend .debug;
}

.debug {
  border: 0px red solid;
}
</style>