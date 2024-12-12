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
        <div v-if="isLoggedIn">
            <p>Your Vote: {{ user_vote.vote_value }}</p>  
            <button type="button" @click="like">Like</button>
            <button type="button" @click="dislike">Dislike</button>
        </div>
        <router-link :to="`/profile/${author.user_id}`"><p>by: {{ author.username }}</p></router-link>
        <MdPreview id="preview-only" language="en-US" :modelValue="post.content" />
    </article>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted,watch } from 'vue';
import { getPost } from '@/models/posts';
import { getPostVotes,getUserVote,createVote,editVote } from '@/models/votes';
import { getPostTags } from '@/models/tags';
import { getUser } from '@/models/users';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const props = defineProps({
    postId: { type: Number, required: true, default: () => (null) },
});

const route = useRoute()

const post = ref({});
const votes = ref(0);
const tags = ref({});
const author = ref({});
const user_vote = ref({});

const isLoggedIn = ref(false)
const user_id = ref(null)

const like = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not logged in. Token is missing.');
            return;
        }

        if (Object.keys(user_vote.value).length === 0) {
            // Create a new vote
            console.log('en create conditional')
            const createResponse = await createVote(token, props.postId, 1);
        } else {
            // Edit the existing vote
            await editVote(token, props.postId, 1);
        }

        // Refresh votes and user_vote
        votes.value = await getPostVotes(props.postId);
        user_vote.value = await getUserVote(user_id.value, props.postId);
    } catch (error) {
        console.error('Error in like function:', error);
    }
};

const dislike = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not logged in. Token is missing.');
            return;
        }

        if (Object.keys(user_vote.value).length === 0) {
            const createResponse = await createVote(token, props.postId, 0);
        } else {
            // Edit the existing vote
            await editVote(token, props.postId, 0);
        }

        // Refresh votes and user_vote
        votes.value = await getPostVotes(props.postId);
        user_vote.value = await getUserVote(user_id.value, props.postId);
    } catch (error) {
        console.error('Error in dislike function:', error);
    }
};

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
  user_id.value = localStorage.getItem('user_id');
}

watch(route, () => {
  checkLoginStatus()
});

onMounted(async () => {
    checkLoginStatus();
    try {
        post.value = await getPost(props.postId);
        votes.value = await getPostVotes(props.postId);
        tags.value = await getPostTags(props.postId);
        author.value = await getUser(post.value.author_id);

        if(!isLoggedIn.value){
            return;
        }

        user_vote.value = await getUserVote(user_id.value,props.postId);

    } catch (error) {
        console.error('Error fetching post data:', error);
    }
});
</script>