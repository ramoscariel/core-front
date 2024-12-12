<template>
    <header>
        <router-link to="/">
            <h1>Notes</h1>
        </router-link>
        <div v-if="!isLoggedIn">
            <router-link to="/login">Log in</router-link>
            <router-link to="/register">Register</router-link>
        </div>
        <div v-else>
            <!--<router-link to="/profile">Profile</router-link>-->
            <button @click="logout">Log out</button>
        </div>
    </header>
    <RouterView></RouterView>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

const route = useRoute()
const router = useRouter();
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    isLoggedIn.value = false;
    router.push('/');
}

watch(route, () => {
  checkLoginStatus()
});

onMounted(() => {
    checkLoginStatus();
});
</script>