<script setup lang="ts">
// import { ref } from 'vue';
// const projectName = "projectName";
// import texts from '../../assets/txts.json';
// const lang = ref<'en'>('en');

// Medias
import title from '../../assets/project-imgs/klick/klick01.jpg'
</script>

<template>
  <div class="page">
    <button onclick="myFunction()">Hello</button>

    <div class="center">

      <div class="big-img"><img :src="title"></img></div>
      <!-- <video class="big-vid" autoplay loop muted playsinline>
        <source :src="testVid" type="video/mp4" />
      </video> -->
      <div class="divider-medium"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  border: 1px red solid;
}

.center {
  border: 1px red solid;
}

button {
  border: 1px red solid;
}
</style>