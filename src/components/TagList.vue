<template>
    <Tag v-for="(_, index) in tagCount" :key="index" :tags="tags" ref="tagsRef" />
    <button type="button" @click="addTag">+</button>
    <button type="button" @click="removeTag">-</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
    tagsRef.value.forEach(tagElem => {
        const val = tagElem.getSelectedTag();
        if (!val || val.tag_name.trim() === '') {
            return;
        }
        selectedTags.push(val);
    });
    return selectedTags;
}

const getTagNames = () => {
    const selectedTags = getSelectedTags();
    const tag_names = new Set();

    for (let i = 0; i < selectedTags.length; i++) {
        const tag = selectedTags[i];

        if (!tag || tag.tag_name.trim() === '') {
            continue;
        }

        if (!tag_names.has(tag.tag_name)) {
            tag_names.add(tag.tag_name.trim());
        }
    }

    return Array.from(tag_names);
};


const reset = () => {
    tagCount.value = 1
    tagsRef.value[0].reset();
};

onMounted(async () => {
    try {
        tags.value = await getTags();
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
});

defineExpose({
    getSelectedTags,
    getTagNames,
    reset,
});
</script>