<template>
    <form>
        Tags
        <TagList ref="tagListRef"/>
        <label for="title">Title</label>
        <input v-model="title" id="title" type="text">

        <label for="fromDate">From</label>
        <input v-model="fromDate" id="fromDate" type="date">

        <label for="toDate">To</label>
        <input v-model="toDate" id="toDate" type="date">

        <button type="button" @click="clearFilters">Clear Filters</button>

        <button type="button" @click="setFilters">Filter</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import TagList from './TagList.vue';

const title = ref('');
const fromDate = ref('');
const toDate = ref('');
const tagListRef = ref(null);

const emit = defineEmits(['filtersCleared','filtersSet']);

const setFilters = async () => {
    emit('filtersSet', title.value,fromDate.value,toDate.value,tagListRef.value.getTagNames());
}

const clearFilters = () => {
    title.value = '';
    fromDate.value = '';
    toDate.value = '';
    tagListRef.value.reset();
    emit('filtersCleared');
}
</script>