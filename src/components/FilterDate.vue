<template>
    <form>
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

const fromDate = ref('');
const toDate = ref('');

const emit = defineEmits(['filtersCleared','filtersSet']);

const setFilters = async () => {
    emit('filtersSet',fromDate.value,toDate.value);
}

const clearFilters = () => {
    fromDate.value = '';
    toDate.value = '';
    emit('filtersCleared');
}

defineExpose({
    clearFilters,
})
</script>