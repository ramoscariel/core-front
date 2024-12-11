<template>
    <article>
        <h2>{{ post.title }}</h2>
        <p>
            Tags:
            <span v-for="(tag, index) in tags" :key="tag.tag_id">
                <em>{{ tag.tag_name }}</em><span v-if="index < tags.length - 1">, </span>
            </span>
        </p>
        <p>Votes: {{ votes }}</p>
        <p>Created: {{ post.creation_time }}</p>
        <p>by: {{ author.username }}</p>
        <MdPreview id="preview-only" language="en-US" :modelValue="post.content" />
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPost } from '@/models/posts';
import { getPostVotes } from '@/models/votes';
import { getPostTags } from '@/models/tags';
import { getUser } from '@/models/users';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const props = defineProps({
    postId: { type: Number, required: true, default: () => (null) },
});

const post = ref({});
const votes = ref(0);
const tags = ref({});
const author = ref({});

onMounted(async () => {
    try {
        post.value = await getPost(props.postId);
        votes.value = await getPostVotes(props.postId);
        tags.value = await getPostTags(props.postId);
        author.value = await getUser(post.value.author_id);

    } catch (error) {
        console.error('Error fetching post data:', error);
    }
});
</script>