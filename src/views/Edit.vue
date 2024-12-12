<template>
    <form @submit.prevent="edit">
        <TagList ref="tagListRef" />
        <input v-model="title" type="text" />
        <TextEditor ref="editorRef" />
        <button type="submit">Edit</button>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPost, updatePost } from '@/models/posts';
import { deletePostTags } from '@/models/tags';
import { associateTagsToPost } from '@/util/setPostTags';
import TagList from '@/components/TagList.vue';
import TextEditor from '@/components/TextEditor.vue';

const route = useRoute();
const router = useRouter();

const tagListRef = ref(null);
const editorRef = ref(null);
const title = ref('');

const edit = async () => {
    const selectedTags = tagListRef.value.getSelectedTags();
    if (!title.value.trim() || !editorRef.value.text.trim() || !validateSelectedTags()) {
        alert('Please fill in all the fields.');
        return;
    }

    const post_id = route.params.post_id;
    try {
        const selectedTags = tagListRef.value.getSelectedTags();
        const token = localStorage.getItem('token');
        await updatePost(token, post_id, title.value, editorRef.value.text);
        await deletePostTags(token, post_id)
        await associateTagsToPost(token, post_id, selectedTags);
    }
    catch (error) {
        console.log(error)
    }

    router.push('/');
}

const validateSelectedTags = () => {
    const selectedTags = tagListRef.value.getSelectedTags();
    return selectedTags.length > 0 &&
        selectedTags.some(tag => tag.tag_name.trim() !== "");
}

onMounted(async () => {
    const post_id = route.params.post_id;
    try {
        const post = await getPost(post_id);
        title.value = post.title;
        editorRef.value.text = post.content;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
});
</script>