<script setup lang="ts">
import { onMounted} from 'vue';
import {useCategoryStore} from '../stores/category.js';
import CategoriesItem from './CategoriesItem';

const props = defineProps({
    categories: {
        type: Object,
        required: true,
    },
    isInner: {
        type: Boolean,
    },
    title: {
        type: String,
    }
});

const hasOwn = (category) => {
    for (const key in category) {
        if (key == 'children')
            return true;
    }
    return false;
}

onMounted(() => {
    console.log(props.categories);
});

const isActive = ref(false);
const linkRoute = ref(`http://localhost:5010/categories/${props.title}`);

</script>


<template>
    <NuxtLink :href="linkRoute">
        <p class="category-btn" :class="{active: isActive}" v-if="props.isInner">{{ props.title }}</p>
    </NuxtLink>
    <div v-for="(category, name) in props.categories" :key="category.rowKey">
        <CategoriesItem v-if="!hasOwn(category)" :categoryName="category.name" :isInner="props.isInner"/>
        <CategoriesList v-if="hasOwn(category)" :categories="category.children" :isInner="true" :title="name"/>
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
</style>