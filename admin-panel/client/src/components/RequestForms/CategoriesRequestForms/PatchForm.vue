<script setup>
import {ref} from 'vue';

import { useCategoryStore } from '../../../stores/category.js';

const categoryStore = useCategoryStore();

const categoryToUpdate = ref(null);

const name = ref(null);
const parentCategory = ref('root');


const sendRequest = async () => {
    console.log(parentCategory.value, categoryToUpdate.value.parentCategory);
    if (categoryToUpdate.value && (name.value || parentCategory.value != categoryToUpdate.value.parentCategory )) {
        await categoryStore.patchCategory(categoryToUpdate.value, name.value, parentCategory.value);
        await categoryStore.getAllCategories();
    }
    else {
        console.log("No data provided");
    }
}

</script>

<template>
    <form>
        <label>Choose category to edit</label>
        <select v-model="categoryToUpdate">
            <option v-for="i in categoryStore.allCategories.length" :key="i"
                    :value="categoryStore.allCategories[i-1]">
                {{ categoryStore.allCategories[i-1].name }}
            </option>
        </select>
        <div>
        <label>Name</label>
        <input v-model="name"/>
        <label>Parent category</label>
        <select v-model="parentCategory">
            <option value="root">None</option>
            <option v-for="i in categoryStore.allCategories.length" :key="i"
                    :value="categoryStore.allCategories[i-1].name">
                {{ categoryStore.allCategories[i-1].name }}
            </option>
        </select>
        </div>
    </form>
    <button class="send-btn" @click="sendRequest">Edit category</button>
    <div class="result" v-if="categoryStore.isEntityUpdated != 'pending'">
        <div class="success" v-if="categoryStore.isEntityUpdated == 'fulfilled'"><p>Updated</p></div>
        <div class="fail" v-if="categoryStore.isEntityUpdated == 'rejected'">Failed to update</div>
    </div>
</template>

<style scoped>
input {
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 3px;
}
label {
    margin-right: 5px;
}
select {
    padding: 3px;
    border-radius: 5px;
}
.send-btn {
    background: #d9effe;
    border: 1px solid #5075ff;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
}
.result {
    margin-top: 20px;
    padding: 20px;
}
.success {
    width: 300px;
    height: 50px;
    background-color: #5bff2f;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fail {
    width: 300px;
    height: 50px;
    background-color: #f74444;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
p {
    font-weight: 600;
}

div {
    margin-top: 20px;
}
</style>
