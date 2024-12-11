<template>
    <Tag v-for="(_, index) in tagCount" :key="index" :tags="tags" ref="tagsRef" />
    <button type="button" @click="addTag">+</button>
    <button type="button" @click="removeTag">-</button>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { getTags } from '@/models/tags';
import Tag from './Tag.vue';

const tagCount = ref(1);
const tags = ref([]);
const tagsRef = ref([]);

const addTag = () => {
    if (tagCount.value < 5) {
        tagCount.value++;
    };
}
const removeTag = () => {
    if (tagCount.value > 1) {
        tagCount.value--;
    };
}

const getSelectedTags = () => {
    const selectedTags = [];
    tagsRef.value.forEach(tag => {
        selectedTags.push(tag.getSelectedTag());
    });
    return selectedTags;
}

onMounted(async () => {
    try {
        tags.value = await getTags();
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
});

defineExpose({
    getSelectedTags,
});
</script>