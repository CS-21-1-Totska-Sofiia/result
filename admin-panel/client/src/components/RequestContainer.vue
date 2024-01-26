<script setup>
import RequestTitle from './RequestTitle.vue';

const props = defineProps({
	requestTitle: {
    	type: String,
		required: true
	},
	requestString: {
      	type: String,
      	required: true,
    },
    color: {
        type: String
    }
});
</script>

<template>
    <RequestTitle :request-title="props.requestTitle" :request-string="props.requestString"/>
    <div class="form-wrapper">
        <slot name="form"></slot>

    </div>
</template>

<style scoped>
.form-wrapper {
    margin-top: 20px;
}
</style>
