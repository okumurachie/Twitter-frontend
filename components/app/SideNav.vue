<template>
    <div v-if="isOpen" class="overlay" @click="emit('close')"></div>

    <aside :class="['sidebar', { open: isOpen }]">
        <button class="close-button" @click="emit('close')">×</button>
        <div class="logo">
            <img src="/images/logo.png" alt="サイドバーヘッダー" />
        </div>
        <div class="sidebar-content">
            <nav class="menu">
                <NuxtLink to="/" class="menu-item" @click="emit('close')">
                    <img src="/images/home.png" alt="ホームアイコン" class="menu-icon" />
                    <span>ホーム</span>
                </NuxtLink>
            </nav>
            <div v-if="loading" class="auth-loading">
                読み込み中...
            </div>
            <button v-else-if="isLoggedIn" class="logout" @click="handleLogout">
                <img src="/images/logout.png" alt="ログアウトアイコン" class="menu-icon" />
                <span>ログアウト</span>
            </button>
            <button v-else class="logout" @click="handleLogin">
                <img src="/images/logout.png" alt="ログインアイコン" class="menu-icon" />
                <span>ログイン</span>
            </button>
            <form class="post-box" @submit.prevent="onSubmit">
                <label for="textarea">シェア</label>
                <textarea class="post-box-input" v-model="message" placeholder="ここに記入" rows="8"
                    :class="{ 'error': errors.message }" @focus="!auth.isLoggedIn && navigateTo('/login')"></textarea>
                <span v-if="errors.message" class="post-error-message">
                    {{ errors.message }}
                </span>
                <div class="button-wrapper">
                    <button class="post-button" type="submit" :disabled="!auth.isLoggedIn || isLoading">{{ isLoading ?
                        '送信中...' : 'シェアする'
                        }}</button>
                </div>
            </form>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'


defineProps({
    isOpen: Boolean
})

const auth = useAuthStore()

const emit = defineEmits(['close', 'submit'])


const isLoggedIn = computed(() => auth.isLoggedIn)
const loading = computed(() => auth.loading)

const handleLogout = async () => {
    try {
        const { $auth } = useNuxtApp()
        await signOut($auth)
        emit('close')
        await navigateTo('/')
    } catch (error) {
        console.error('ログアウトエラー:', error)
        alert('ログアウトに失敗しました')
    }
}

const handleLogin = () => {
    emit('close')
    navigateTo('/login')
}

const schema = yup.object({
    message: yup
        .string()
        .required('投稿は入力必須です')
        .max(120, '120文字以内で入力してください')
})

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema
})

const { value: message } = useField('message')

const isLoading = ref(false)

const submitHandler = handleSubmit(async (values) => {
    isLoading.value = true

    try {
        emit('submit', values.message)
        resetForm()
    } catch (error) {
        console.error('投稿送信エラー:', error)
        alert('投稿送信に失敗しました')
    } finally {
        isLoading.value = false
    }
})

const onSubmit = async () => {
    if (!auth.isLoggedIn) {
        await navigateTo('/login')
        return
    }

    await submitHandler()
}

</script>

<style scoped>
.sidebar {
    width: 280px;
    padding: 16px;
    box-sizing: border-box;
}

.logo {
    width: 40%;
    margin: 20px 0 20px 20px;
}

.logo img {
    width: 100%;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
}

.menu-item,
.logout {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    text-decoration: none;
    color: #fff;
}

.menu-icon {
    width: 20px;
    height: 20px;
}

.post-box {
    width: 90%;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.post-box * {
    box-sizing: border-box;
}

.post-box label {
    color: #fff;
    margin-bottom: 10px;
    font-size: 18px;
}

.post-box textarea {
    width: 100%;
    margin: 0 auto;
    resize: none;
    padding: 8px;
    border-radius: 8px;
    background-color: #000;
    border: 1px solid #fff;
    margin-bottom: 10px;
    font-size: 18px;
    color: #fff;
    transition: border-color 0.25s ease;
}

.post-box textarea:focus {
    outline: none;
    border-color: #1d9bf0;
}

.button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.post-button {
    width: 40%;
    margin-top: 8px;
    padding: 8px;
    border-radius: 20px;
    background: #1d9bf0;
    color: #fff;
    border: none;
    cursor: pointer;
    transition:
        background-color 0.25s ease,
        transform 0.15s ease;
}

.post-button:hover {
    background: #156eaa;
    transform: translateY(-1px);
}

.logout {
    margin: 20px 0;
    padding: 0;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
}

.close-button {
    display: none;
}

.overlay {
    display: none;
}

.post-box-input.error {
    border: 1px solid #e74c3c;
}

.post-error-message {
    padding-left: 10px;
    font-size: 14px;
    color: #e74c3c;
}

@media (max-width: 767px) {
    .overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #000;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    .overlay {
        opacity: 1;
        pointer-events: auto;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: -80%;
        width: 80%;
        height: 100vh;
        z-index: 1000;
        transition: left 0.3s ease;
        border-right: 1px solid #fff;
    }

    .sidebar.open {
        left: 0;
    }

    .close-button {
        display: block;
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 32px;
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        line-height: 1;
    }
}
</style>
