<template>
  <router-link to="/create">Crear</router-link>
  <h2>Filters</h2>
  <Filters @filtersCleared="onFiltersCleared" @filtersSet="onFiltersSet"></Filters>
  <div class="posts-container">
    <Post v-for="post in posts" :key="post.post_id" :postId="post.post_id"></Post>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getPosts } from '@/models/posts';
import { addTagsToPosts } from '@/util/postsInit';
import { filterPosts } from '@/util/postsFilter';
import Filters from '@/components/Filters.vue';
import Post from '@/components/Post.vue';

let allPosts = [];
const posts = ref([]);

const onFiltersSet = (title, fromDate, toDate, tags) => {
  posts.value = filterPosts(allPosts, title, fromDate, toDate, tags);
}

const onFiltersCleared = () => {
  posts.value = allPosts;
}

onMounted(async () => {
  try {
    allPosts = await getPosts();
    addTagsToPosts(allPosts);
    posts.value = allPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});

</script>