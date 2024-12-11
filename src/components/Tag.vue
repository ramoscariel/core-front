<template>
    <input v-model="searchTerm" @input="onInput" type="text" placeholder="tag-name" />
    <ul v-if="filteredTags.length > 0">
        <li v-for="tag in filteredTags" :key="tag.tag_id" @click="selectTag(tag)">
            {{ tag.tag_name }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    tags: Array,
});

const searchTerm = ref('');
const filteredTags = ref([]);
const selectedTag = ref(null);

const onInput = () => {
    updateSelectedTag({ tag_id: null, tag_name: searchTerm.value });
    filterTags();
};

const selectTag = (tag) => {
    updateSelectedTag(tag);
    searchTerm.value = tag.tag_name;
    filteredTags.value = [];
};

const updateSelectedTag = (val) => {
    selectedTag.value = val;
};

const getSelectedTag = () => {
    return selectedTag.value;
}

const filterTags = () => {
    if (!props.tags.length || searchTerm.value.trim() === '') {
        filteredTags.value = [];
        return;
    }

    filteredTags.value = props.tags
        .filter((tag) =>
            tag.tag_name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
        .slice(0, 5);
};

defineExpose({
  getSelectedTag,
});
</script>