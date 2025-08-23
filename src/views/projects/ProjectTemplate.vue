<script setup lang="ts">
import { ref } from 'vue';
const project = "projectTemplate";

import testImg from '../../assets/project-imgs/jetpack-marshmallow.jpg'
import texts from '../../assets/txts.json';
const lang = ref<'en' | 'de'>('en')
</script>

<template>
  <div class="page">
    <div class="center">
      <div class="big-img"><img :src="testImg"></img></div>
      <!-- <video class="big-vid" autoplay loop muted playsinline>
        <source :src="testVid" type="video/mp4" />
      </video> -->
      <div class="divider-medium"></div>
      <div class="text">
        <div class="title">{{ texts.projects[project][lang].title }}</div>
        <div class="subtitle">{{ texts.projects[project][lang].subtitle }}</div>
        <div class="divider-line"></div>
        <div class="text">{{ texts.projects[project][lang].text }}</div>
        <div class="divider-small"></div>
        <a :href="texts.projects[project][lang].linkUrl" target="_blank">{{
          texts.projects[project][lang].linkText }}</a>
      </div>
      <div class="divider-small"></div>
      <div class="small-img-container">
        <div class="small-img"><img :src="testImg"></img></div>
        <div class="small-img"><img :src="testImg"></img></div>
        <div class="small-img"><img :src="testImg"></img></div>
        <div class="small-img"><img :src="testImg"></img></div>
      </div>
      <div class="divider-big"></div>
      <div class="title">Credits</div>
      <div class="divider-line"></div>
      <div class="credits">
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle1 }}</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle2 }}</div>
          <div class="text">Name Surname</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle3 }}</div>
          <div class="text">Name Surname</div>
        </div>
        <div class="credit">
          <div class="text-bold">{{ texts.projects[project][lang].creditTitle4 }}</div>
          <div class="text">Name Surname</div>
        </div>
      </div>
    </div>
  </div>
</template>