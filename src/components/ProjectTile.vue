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
        <div class="tile" :style="{ borderWidth: border ? border + 'px' : '0' }"><img :src="image"
                @click="$router.push(link ? link : '')" />
        </div>
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    color: black;
    margin-top: 2.3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


.tile {
    // @extend .debug;
    width: 40vw;
    min-width: 300px;
    max-width: 700px;
    height: 35vw;
    max-height: 300px;
    min-height: 200px;
    border-style: solid;
    border-color: var(--bg-grey-mid);
    overflow: hidden;
    cursor: pointer;
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
    margin-top: 0.8vh;
}

.debug {
    border: 1px solid rgb(211, 15, 67);
}
</style>
