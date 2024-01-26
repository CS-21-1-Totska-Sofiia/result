<script setup>
    const route = useRoute();

    import { useGoodStore } from '../../stores/good.js';

    const goodStore = useGoodStore();
    goodStore.getOneGood(route.params.category, route.params.id);
</script>

<template>
    <div class="good-wrapper" v-if="goodStore.fetchedCurrent">
        <img :src="goodStore.currentGood.urlObj" alt="">
        <div>
            <h2>{{ goodStore.currentGood.name }}</h2>
            <p>{{ goodStore.currentGood.price }}$</p>
        </div> 
    </div>
</template>

<style scoped>
img {
    width: 300px;
}
h2 {
    font-size: 40px;
}
p {
    font-size: 20px;
}
.good-wrapper {
    display: flex;
    width: 400px;
    align-items: center;
}
</style>
