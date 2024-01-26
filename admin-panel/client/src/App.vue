<script setup>
import {ref} from 'vue';

import RequestContainer from './components/RequestContainer.vue';

import CategoryPostForm from './components/RequestForms/CategoriesRequestForms/PostForm.vue';
import CategoryPatchForm from './components/RequestForms/CategoriesRequestForms/PatchForm.vue';
import CategoryDeleteForm from './components/RequestForms/CategoriesRequestForms/DeleteForm.vue';

import GoodPostForm from './components/RequestForms/GoodsRequestForms/PostForm.vue';
import GoodPatchForm from './components/RequestForms/GoodsRequestForms/PatchForm.vue';
import GoodDeleteForm from './components/RequestForms/GoodsRequestForms/DeleteForm.vue';

import { useCategoryStore } from './stores/category.js';
import { useGoodStore } from './stores/good';


const goodStore = useGoodStore();
const categoryStore = useCategoryStore();


goodStore.getAllGoods();
categoryStore.getAllCategories();

const showCategories = ref(true);


const changeTable = (isCategories) => {
  showCategories.value = isCategories;
}

</script>

<template>
  <div class="select-table-wrapper">
    <button class="toogle-table-btn" 
          :class="{active: showCategories}" @click="() => changeTable(true)">Categories</button>
    <button class="toogle-table-btn" 
          :class="{active: !showCategories}" @click="() => changeTable(false)">Goods</button>
  </div>
  <div class="table-interaction-wrapper" v-if="showCategories">
		<div class="request-container">
			<RequestContainer request-title="post" request-string="/categories/entity">
				<template v-slot:form>
					<CategoryPostForm/>
				</template>
			</RequestContainer>
		</div>
    <div class="request-container">
      <RequestContainer request-title="patch" request-string="/categories/entity">
        <template v-slot:form>
          <CategoryPatchForm/>
        </template>
      </RequestContainer>
    </div>
    <div class="request-container">
      <RequestContainer request-title="delete" request-string="/categories/entity">
        <template v-slot:form>
          <CategoryDeleteForm/>
        </template>
      </RequestContainer>
    </div>
  </div>
  <div class="table-interaction-wrapper" v-if="!showCategories">
		<div class="request-container">
			<RequestContainer request-title="post" request-string="/goods/entity">
				<template v-slot:form>
					<GoodPostForm/>
				</template>
			</RequestContainer>
		</div>
    <div class="request-container">
      <RequestContainer request-title="patch" request-string="/goods/entity">
        <template v-slot:form>
          <GoodPatchForm/>
        </template>
      </RequestContainer>
    </div>
    <div class="request-container">
      <RequestContainer request-title="delete" request-string="/goods/entity">
        <template v-slot:form>
          <GoodDeleteForm/>
        </template>
      </RequestContainer>
    </div>
  </div>
</template>

<style scoped>
.request-container {
	margin-bottom: 30px;
	padding-bottom: 30px;
	border-bottom: 3px solid rgb(212, 212, 212);
}

.select-table-wrapper {
  display: flex;
  justify-content: space-around;
  height: 50px;
  background-color: #f4f3fb;
  border-radius: 5px;
  align-items: center;
  padding: 0 250px;
}
.toogle-table-btn {
  height: 40px;
  width: 100px;
  background: transparent;
  border: 0px;
  font-size: 18px;
  cursor: pointer;
}
.active {
  text-decoration: underline;
}

.table-interaction-wrapper {
  margin-top: 30px;
}
</style>
