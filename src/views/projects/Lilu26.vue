<script setup lang="ts">
import testImg from '../../assets/project-imgs/lilu26/lilu-sketch.jpg';

</script>

<template>
  <div class="page">
    <div class="center">
      <div class="big-img"><img :src="testImg"></img></div>
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">Project Name</div>
        <div class="subtitle">Project Type</div>
        <div class="divider-line"></div>
        <div class="text">Text<br>Text<br>Text<br>Text<br>Text<br>Text</div>
        <div class="divider-small"></div>
        <a href="http://url.ch/" target="_blank">link</a>
      </div>
      <div class="divider-small"></div>
      <div class="small-img-container">
        <div class="big-img"><img :src="testImg"></img></div>
        Placeholder for Small Images
      </div>
      <div class="divider-big"></div>
      <div class="title">Credits</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">Title Credit1</div>
          <div class="text">Text Credit</div>
        </div>
        <div class="credit">
          <div class="text-bold">Title Credit2</div>
          <div class="text">Text Credit</div>
        </div>
        <div class="credit">
          <div class="text-bold">Title Credit3</div>
          <div class="text">Text Credit</div>
        </div>
        <div class="credit">
          <div class="text-bold">Title Credit4</div>
          <div class="text">Text Credit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  color: black;
  margin-top: 2rem;
  background-color: var(--bg-white);
  position: relative;
  padding-bottom: 6rem;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
}

.center {
  margin-top: 2.3rem;
  width: 40vw;
  min-width: 350px;
  max-width: 700px;
}

.big-img {
  height: 35vw;
  max-height: 300px;
  min-height: 200px;
  border-style: solid;
  border-color: var(--bg-grey-mid);
  overflow: hidden;
}

img {
  width: 100%;
  object-fit: cover;
}

.credits {
  display: flex;
  flex-wrap: wrap;
}

.credit {
  padding-bottom: 2rem;
  padding-right: 3rem;
}
</style>
