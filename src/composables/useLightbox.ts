import { ref, onBeforeUnmount } from "vue";

export function useLightbox() {
  const currentImg = ref<string | null>(null);

  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") closeLightbox();
  }

  function openLightbox(img: string) {
    currentImg.value = img;
    window.addEventListener("keydown", onKey);
  }

  function closeLightbox() {
    currentImg.value = null;
    window.removeEventListener("keydown", onKey);
  }

  onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

  return { currentImg, openLightbox, closeLightbox };
}
