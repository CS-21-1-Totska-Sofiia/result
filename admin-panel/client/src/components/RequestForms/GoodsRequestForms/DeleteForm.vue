<script setup>
import {ref} from 'vue';

import { useGoodStore } from '../../../stores/good.js';
import { useCategoryStore } from '../../../stores/category';

const goodStore = useGoodStore();
const categoryStore = useCategoryStore();

const good = ref(null);
const categoryToDelete = ref(null);

const entitiesInActiveCategory = ref([]);


const switchCategory = () => {
    entitiesInActiveCategory.value = [];
    goodStore.allGoods.forEach(good => {
        if (good.category == categoryToDelete.value.name)
            entitiesInActiveCategory.value.push(good);
    });
}


const sendRequest = async () => {
    if (good.value) {
        await goodStore.deleteGood(good.value);
        await goodStore.getAllGoods();
    }
}

</script>

<template>
    <form>
        <label>Category</label>
        <select v-model="categoryToDelete" @change="switchCategory">
            <option v-for="i in categoryStore.allCategories.length" :key="i"
                    :value="categoryStore.allCategories[i-1]">
                {{ categoryStore.allCategories[i-1].name }}
            </option>
        </select>
        <label>Good</label>
        <select v-model="good">
            <option v-for="i in entitiesInActiveCategory.length" :key="i"
                    :value="entitiesInActiveCategory[i-1]">
                {{ entitiesInActiveCategory[i-1].name }}
            </option>
        </select>
    </form>
    <button class="send-btn" @click="sendRequest">Delete good</button>
    <div class="result" v-if="goodStore.isEntityDeleted != 'pending'">
        <div class="success" v-if="goodStore.isEntityDeleted == 'fulfilled'"><p>Deleted</p></div>
        <div class="fail" v-if="goodStore.isEntityDeleted == 'rejected'">Failed to delete</div>
    </div>
</template>

<style scoped>
input, select {
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 3px;
}
label {
    margin-right: 5px;
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
