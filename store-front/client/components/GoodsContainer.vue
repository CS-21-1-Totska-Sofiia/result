<script setup lang="ts">
import { onMounted} from 'vue';
import {useCategoryStore} from '../stores/category.js';
import {useGoodStore} from '../stores/good.js';
import CategoriesItem from './CategoriesItem';

const store = useGoodStore();

const props = defineProps({
    goods: {
        type: Array,
        required: true,
    }
});

const getLink = (category, id) => {
    return `http://localhost:5010/goods-${category}/${id}`;
}

</script>


<template>
    <div v-if="store.fetched">
        <div v-for="i in props.goods.length" class="good-wrapper">
            <img v-if="props.goods[i-1].urlMinObj" :src="props.goods[i-1].urlMinObj">
            <div class="good-data">
                <p>{{ props.goods[i-1].name }}</p>
                <p>{{ props.goods[i-1].price }}$</p>
            </div>
            <NuxtLink :href="getLink(props.goods[i-1].partitionKey, props.goods[i-1].rowKey)">
                <p>Show deatils</p>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.category-btn {
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: 18px;
}
.active {
    text-decoration: underline;
}
img {
    width: 100px
}
.good-wrapper {
    background: rgba(154, 238, 246, 0.613);
    width: 300px;
    display: flex;
    padding: 20px;
    margin: 30px 0;
}
.good-data {
    margin-left: 20px;
}
</style>