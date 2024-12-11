<template>
    <h2>Login</h2>
    <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/models/users';

const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
    try {
        const response = await loginUser(email.value, password.value);
        if (!response) {
            alert('Invalid Credentials');
            return;
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        router.push('/');
    } catch (error) {
        console.error('Login failed', error);
    }
}
</script>