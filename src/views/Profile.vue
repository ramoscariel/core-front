<template>
    <p>{{ username }}</p>
    <button type="button" @click="showPublishedPosts">Published Posts</button>
    <button type="button" @click="showLikedPosts">Liked Posts</button>
    <h2>Filters</h2>
    <Filters @filtersCleared="onFiltersCleared" @filtersSet="onFiltersSet"></Filters>
    <div class="posts-container">
        <Post v-for="post in posts" :key="post.post_id" :postId="post.post_id"></Post>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getUser } from '@/models/users';
import { getLikedPosts, getPostedPosts } from '@/models/posts';
import { addTagsToPosts } from '@/util/postsInit';
import { filterPosts } from '@/util/postsFilter';
import Post from '@/components/Post.vue';
import Filters from '@/components/Filters.vue';

let likedPosts = [];
let ownPosts = [];

const showingLiked = ref(false);

const username = ref(null);
const posts = ref([]);

const route = useRoute();

const showLikedPosts = () => {
    posts.value = likedPosts;
    showingLiked.value = true;
}

const showPublishedPosts = () => {
    posts.value = ownPosts;
    showingLiked.value = false;
}

const onFiltersSet = (title, fromDate, toDate, tags) => {
    if(showingLiked.value){
        posts.value = filterPosts(likedPosts, title, fromDate, toDate, tags);
    }else{
        posts.value = filterPosts(ownPosts, title, fromDate, toDate, tags);
    }
}

const onFiltersCleared = () => {
    if(showingLiked.value){
        posts.value = likedPosts;
    }else{
        posts.value = ownPosts;
    }
}

onMounted(async () => {
    const user_id = route.params.user_id; // Retrieve the user_id from the route parameter
    try {
        const userResponse = await getUser(user_id);
        username.value = userResponse.username;

        likedPosts = await getLikedPosts(user_id);
        addTagsToPosts(likedPosts);

        ownPosts = await getPostedPosts(user_id);
        addTagsToPosts(ownPosts);

        showPublishedPosts();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>