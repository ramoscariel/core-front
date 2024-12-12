<template>
    <form @submit.prevent="create">
        <TagList ref="tagListRef" />
        <input v-model="title" type="text" placeholder="An interesting title..." />
        <TextEditor ref="editorRef" />
        <button type="submit">Create</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { createPost } from '@/models/posts';
import { associateTagsToPost } from '@/util/setPostTags';
import TagList from '@/components/TagList.vue';
import TextEditor from '@/components/TextEditor.vue';

const tagListRef = ref(null);
const editorRef = ref(null);
const title = ref('');

const create = async () => {
    const selectedTags = tagListRef.value.getSelectedTags();
    if (!title.value.trim() || !editorRef.value.text.trim() || !validateSelectedTags()) {
        alert('Please fill in all the fields.');
        return;
    }
    try {
        const selectedTags = tagListRef.value.getSelectedTags();
        const token = localStorage.getItem('token');
        const createPostResponse = await createPost(token, title.value, editorRef.value.text);
        const post_id = createPostResponse.postId;
        associateTagsToPost(token, post_id, selectedTags);
    }
    catch (error) {
        throw error
    }

    title.value = '';
    editorRef.value.text = '';
    tagListRef.value.reset();
}

const validateSelectedTags = () => {
    const selectedTags = tagListRef.value.getSelectedTags();
    return selectedTags.length > 0 &&
        selectedTags.some(tag => tag.tag_name.trim() !== "");
}
</script>