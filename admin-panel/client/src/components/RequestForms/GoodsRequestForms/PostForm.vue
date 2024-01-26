<script setup>
import {ref} from 'vue';

import { useGoodStore } from '../../../stores/good.js';
import { useCategoryStore } from '../../../stores/category';

const goodStore = useGoodStore();
const categoryStore = useCategoryStore();

const name = ref(null);
const price = ref(1);
const category = ref(null);
const selectedImgFile = ref(null);


const selectFile = (event) => {
    selectedImgFile.value = event.target.files[0];
}

const sendRequest = async () => {
    if (name.value && price.value >= 0.01 && category.value && selectedImgFile.value) {
        const formData = new FormData();
        formData.append("image", selectedImgFile.value);

        console.log(price.value);

        await goodStore.postGood(name.value, price.value, category.value, formData);
        await goodStore.getAllGoods();
    }
}

</script>

<template>
    <form>
        <label>Name</label>
        <input v-model="name"/>
        <label>Price</label>
        <input v-model="price" type="number" min="0.01"/>
        <div>
        <label>Category</label>
        <select v-model="category">
            <option v-for="i in categoryStore.allCategories.length" :key="i"
                    :value="categoryStore.allCategories[i-1]">
                {{ categoryStore.allCategories[i-1].name }}
            </option>
        </select>
        </div>
        <div>
            <label for="files" class="select-file-btn">Select Image</label>
            <input id="files" type="file" style="display: none;" @change="selectFile" lang="en">
            <label>{{ selectedImgFile?.name }}</label>
        </div>
    </form>
    <button class="send-btn" @click="sendRequest">Create good</button>
    <div class="result" v-if="goodStore.isEntityCreated != 'pending'">
        <div class="success" v-if="goodStore.isEntityCreated == 'fulfilled'"><p>Created</p></div>
        <div class="fail" v-if="goodStore.isEntityCreated == 'rejected'">Failed to create</div>
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
.select-file-btn {
    border: 1px solid rgb(144, 144, 144);
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
