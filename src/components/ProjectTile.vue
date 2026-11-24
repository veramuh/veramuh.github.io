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
    <RouterLink :to="link ?? '/'" class="wrapper camouflagedLink">
        <div class="tile" :style="{ borderWidth: border ? border + 'px' : '0' }">
            <img :src="image" :alt="title" />
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="subtitle">{{ subtitle }}</div>
    </RouterLink>
</template>

<style lang="scss" scoped>
.wrapper {
    display: block;
    margin-top: 2.3rem;
    width: 40vw;
    min-width: 300px;
    max-width: 700px;
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


.wrapper:hover img {
    transform-origin: center;
    transform: scale(1.02);
    transition: transform 0.3s;
}

.title {
    // @extend .debug;
    margin-top: 1rem;
    ;
}

.debug {
    border: 1px solid rgb(211, 15, 67);
}
</style>
