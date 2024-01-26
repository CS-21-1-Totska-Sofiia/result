<script setup>
import {ref} from 'vue';

import { useGoodStore } from '../../../stores/good.js';
import { useCategoryStore } from '../../../stores/category';

const goodStore = useGoodStore();
const categoryStore = useCategoryStore();

const good = ref(null);
const categoryToEdit = ref(null);

const name = ref(null);
const price = ref(null);
const category = ref(null);
const selectedImgFile = ref(null);

const entitiesInActiveCategory = ref([]);

const selectFile = (event) => {
    selectedImgFile.value = event.target.files[0];
}

const switchCategory = () => {
    entitiesInActiveCategory.value = [];
    goodStore.allGoods.forEach(good => {
        if (good.category == categoryToEdit.value.name)
            entitiesInActiveCategory.value.push(good);
    });
}

const sendRequest = async () => {
    if (categoryToEdit.value && good.value) {
        if ((name.value && name.value != good.value.name) || (price.value >= 0.01 && price.value != good.value.price) || 
            (category.value && category.value.name != good.category) || selectedImgFile.value) {

            let formData = null;
            if (selectedImgFile.value != null) {
                formData = new FormData();
                formData.append("image", selectedImgFile.value);
            }
        
            await goodStore.patchGood(good.value, name.value, price.value, category.value, formData);
            await goodStore.getAllGoods();
        }
    }
}

</script>

<template>
    <form>
        <label>Category</label>
        <select v-model="categoryToEdit" @change="switchCategory">
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
        <div>
            <label>Name</label>
            <input v-model="name"/>
            <label>Price</label>
            <input v-model="price" type="number" min="0.01"/>
            <label>Category</label>
            <select v-model="category">
                <option v-for="i in categoryStore.allCategories.length" :key="i"
                        :value="categoryStore.allCategories[i-1]">
                    {{ categoryStore.allCategories[i-1].name }}
                </option>
            </select>
        </div>
        <div>
            <label for="filesEdit" class="select-file-btn">Select Image</label>
            <input id="filesEdit" type="file" style="display: none;" @change="selectFile" lang="en">
            <label>{{ selectedImgFile?.name }}</label>
        </div>
    </form>
    <button class="send-btn" @click="sendRequest">Edit good</button>
    <div class="result" v-if="goodStore.isEntityUpdated != 'pending'">
        <div class="success" v-if="goodStore.isEntityUpdated == 'fulfilled'"><p>Updated</p></div>
        <div class="fail" v-if="goodStore.isEntityUpdated == 'rejected'">Failed to update</div>
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
.select-file-btn {
    border: 1px solid rgb(144, 144, 144);
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
