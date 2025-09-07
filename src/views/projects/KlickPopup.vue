<script setup lang="ts">

let text = "hoi";

function klick() {
  text = "hey";

}
</script>

<template>
  <div class="page">

    <div class="center">
      <button @click="klick">Hello</button>
      <div>{{ text }}</div>
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
  border: 1px red solid;
}

.center {
  border: 1px red solid;
  display: flex;
  justify-content: center;
}

button {
  border: 1px red solid;
}
</style>