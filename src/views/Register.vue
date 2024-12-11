<template>
    <h2>Register</h2>
    <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Username" required>
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="passwordA" type="password" placeholder="Password" required>
        <input v-model="passwordB" type="password" placeholder="Repeat Password" required>
        <button type="submit">Register</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/models/users';

const router = useRouter();

const username = ref('');
const email = ref('');
const passwordA = ref('');
const passwordB = ref('');

const register = async () => {
    if (passwordA.value !== passwordB.value) {
        alert('Password does not match');
        return;
    }
    const response = await registerUser(email.value, username.value, passwordA.value);
    if(!response){
        alert('Registration failed');
        return;
    }
    router.push('/login');
}
</script>