<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '../../stores/category.js';
import { useGoodStore } from '../../stores/good.js';

const route = useRoute();

const categoryStore = useCategoryStore();
const goodStore = useGoodStore();

goodStore.getGoods(route.params.categoryName);

const getHref = (name) => {
    return `http://localhost:5010/categories/${name}`;
}



onMounted(() => {
    console.log("Loaded", categoryStore.allCategories[route.params.categoryName] );
});

</script>

<template>
    <p class="title">{{ route.params.categoryName }}</p>
    <div v-if="categoryStore.allCategories[route.params.categoryName]">
        <div v-if="categoryStore.allCategories[route.params.categoryName].children">
            <NuxtLink v-for="(child, name) in categoryStore.allCategories[route.params.categoryName].children" :key="child.rowKey" :href="getHref(name)">
                <button>/{{ name }}</button>
            </NuxtLink>
        </div>
    </div>
    <div>
        <GoodsContainer :goods="goodStore.goods"/>
    </div>
</template>

<style scoped>
.title {
    font-size: 25px;
    font-weight: bold;
}
button {
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: 16px;
}
</style>
