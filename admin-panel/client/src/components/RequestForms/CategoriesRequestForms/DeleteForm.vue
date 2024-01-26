<script setup>
import {ref} from 'vue';

import { useCategoryStore } from '../../../stores/category.js';

const categoryStore = useCategoryStore();

const categoryToDelete = ref(null);


const sendRequest = async () => {
    if (categoryToDelete.value) {
        await categoryStore.deleteCategory(categoryToDelete.value.partitionKey, categoryToDelete.value.rowKey);
        await categoryStore.getAllCategories();
    }
}

</script>

<template>
    <form>
        <label>Choose category to delete</label>
        <select v-model="categoryToDelete">
            <option v-for="i in categoryStore.allCategories.length" :key="i"
                    :value="categoryStore.allCategories[i-1]">
                {{ categoryStore.allCategories[i-1].name }}
            </option>
        </select>
    </form>
    <button class="send-btn" @click="sendRequest">Delete category</button>
    <div class="result" v-if="categoryStore.isEntityDeleted != 'pending'">
        <div class="success" v-if="categoryStore.isEntityDeleted == 'fulfilled'"><p>Deleted</p></div>
        <div class="fail" v-if="categoryStore.isEntityDeleted == 'rejected'">Failed to delete</div>
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
