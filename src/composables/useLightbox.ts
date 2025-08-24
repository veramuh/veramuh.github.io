import { ref } from "vue";

export function useLightbox() {
  const currentImg = ref<string | null>(null);

  function openLightbox(img: string) {
    currentImg.value = img;
  }

  function closeLightbox() {
    currentImg.value = null;
  }

  return { currentImg, openLightbox, closeLightbox };
}
