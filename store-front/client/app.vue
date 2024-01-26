<script setup>
import {useCategoryStore} from './stores/category.js';

const categoryStore = useCategoryStore();
categoryStore.getAllCategories();
</script>

<template>
  <div class="main-wrapper" v-if="categoryStore.fetched">
    <aside class="categories-aside" v-if="categoryStore.fetched">
      <CategoriesList :categories="categoryStore.allCategories"/>
    </aside>
    <div class="pages-wrapper">
      <NuxtPage/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: space-around;
}
.categories-aside {
  width: 30%;
  margin: 20px 30px;
}
.pages-wrapper {
  width: 70%;
}
</style>