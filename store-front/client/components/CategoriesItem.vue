<script setup lang="ts">

const props = defineProps({
    categoryName: {
        type: String,
        required: true
    },
    isInner: {
        type: Boolean
    }
});

const isActive = ref(false);
const linkRoute = ref(`http://localhost:5010/categories/${props.categoryName}`);

</script>


<template>
    <NuxtLink :href="linkRoute">
        <p class="category-btn" :class="{subCategory: props.isInner, active: isActive}">{{props.categoryName}}</p>
    </NuxtLink>
    
</template>

<style scoped>
.subCategory {
    margin-left: 30px;
}
.category-btn {
    background: transparent;
    margin-top: 10px;
    border: 0px;
    cursor: pointer;
    font-size: 18px;
    text-decoration: none;
}
.active {
    text-decoration: underline;
}
</style>