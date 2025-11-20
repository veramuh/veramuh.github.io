<script setup lang="ts">
import { ref } from 'vue'
const modal = ref<HTMLElement | null>(null)

function openModal() {
  document.getElementById('modalBg')!.style.display = 'flex';
}
// function closeModal() {
//   document.getElementById('modalBg')!.style.display = 'none';
// }
function bigger() {
  if (modal.value) {
    modal.value.style.width = modal.value.offsetWidth + 100 + "px"
    modal.value.style.width = modal.value.offsetHeight + 50 + "px"
  }
}
</script>


<template>
  <div class="page">
    <div class="center">
      <button @click="openModal()">Don't click me</button>
      <div class="divider-medium"></div>
      <div class="modal-bg" id="modalBg">
        <div ref="modal" class="modal">Ich bin ein Modal
          <button @click="bigger">Buh</button>
        </div>
        <!-- <button @click="closeModal()">Schliessen</button> -->
      </div>
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

.modal-bg {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal {
  position: absolute;
  background: white;
  padding: 20px;
  border-radius: 10px;
  // max-width: 300px;
  width: 200px;
  height: 100px;
  text-align: center;
}

.debug {
  border: 0px red solid;
}
</style>