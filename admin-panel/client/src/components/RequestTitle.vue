<script setup>

import {ref} from 'vue';

const props = defineProps({
	requestTitle: {
    	type: String,
		required: true
	},
	requestString: {
      	type: String,
      	required: true,
    },
});
</script>

<template>
    <div class="title-wrapper">
        <span :class="props.requestTitle">{{ props.requestTitle.toLocaleUpperCase() }}</span>
        <p>{{ props.requestString }}</p>
    </div>
</template>

<style scoped>
.title-wrapper {
    display: flex;
    align-items: baseline;
}

.title-wrapper span {
    border-radius: 5px;
    padding: 5px 12px;
    margin: 0 30px 0 0;
    font-weight: 600;
}

.post {
    background-color: greenyellow;
}
.get {
    background-color: #d997f8;
}
.patch {
    background-color: #ffbf2f;
}
.delete {
    background-color: #ff522f;
}

.title-wrapper p {
    font-size: 18px;
}
</style>
