<template>
    <button type="button" @click="showMostLikedPosts">Most Liked Posts</button>
    <button type="button" @click="showMostUpdatedPosts">Most Updated Posts</button>
    <h2>Filter By Date</h2>
    <FilterDate ref="filerDateRef" @filtersCleared="onFiltersCleared" @filtersSet="onFiltersSet"></FilterDate>
    <div class="posts-container" v-for="post in posts" :key="post.post_id" style="border: 1px solid black;">
        <p>Updated Count: {{ post.updated_count }}</p>
        <Post :postId="post.post_id"></Post>
    </div>
</template>

<script setup>
import Post from '@/components/Post.vue';
import FilterDate from '@/components/FilterDate.vue';
import { ref, onMounted } from 'vue';
import { getPosts } from '@/models/posts';
import { filterPosts } from '@/util/postsFilter';
import { addVotesToPosts } from '@/util/postsInit';
import { sortByLikes,sortByUpdatedCount } from '@/util/sortPosts';

const filerDateRef = ref(null);
const posts = ref([]);

const showMostLikedPosts = () => {
    posts.value = sortByLikes(posts.value);
}

const showMostUpdatedPosts = () => {
    posts.value = sortByUpdatedCount(posts.value);
}

const onFiltersSet = (fromDate, toDate) => {
    posts.value = filterPosts(posts.value, '', fromDate, toDate, []);
}

const onFiltersCleared = async () => {
    setPosts();
}

onMounted(async () => {
    setPosts();
});

const setPosts = async () => {
    try {
        posts.value = await getPosts();
        addVotesToPosts(posts.value);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
    console.log(posts.value);
}
</script>