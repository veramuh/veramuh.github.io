<script setup lang="ts">
defineProps<{
    image?: string;
    title?: string;
    subtitle?: string;
    link?: string;
    border?: number;
}>()
</script>

<template>
    <div class="wrapper">
        <div class="tile" :style="{ borderWidth: border ? border + 'px' : '0' }">
            <img :src="image" />
        </div>
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


.tile {
    // @extend .debug;
    width: 40vw;
    min-width: 350px;
    max-width: 700px;
    height: 35vw;
    max-height: 300px;
    min-height: 200px;
    border-style: solid;
    border-color: var(--bg-grey);
    overflow: hidden;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

img:hover {
    transform-origin: center;
    transform: scale(1.02);
    transition: transform 0.3s;
}

.title {
    // @extend .debug;
    margin-top: 0.5vh;
    font-weight: 500;
    font-size: 2.3em;
}

.subtitle {
    // @extend .debug;
    font-weight: 200;
    font-size: 1.5em;
}

.debug {
    border: 1px solid rgb(211, 15, 67);
}
</style>
