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
            <!-- ログアウト -->
            <button class="logout" @click="handleLogout">
                <img src="/images/logout.png" alt="ログアウトアイコン" class="menu-icon" />
                <span>ログアウト</span>
            </button>
            <!-- 投稿フォーム -->
            <div class="post-box">
                <label for="textarea">シェア</label>
                <textarea placeholder="ここに記入" rows="8"></textarea>
                <div class="button-wrapper">
                    <button class="post-button">シェアする</button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth'

defineProps({
    isOpen: Boolean
})

const { $auth } = useNuxtApp()

const emit = defineEmits(['close'])

const handleLogout = async () => {
    try {
        await signOut($auth)
        emit('close')
        await navigateTo('/')
    } catch (error) {
        console.error('ログアウトエラー:', error)
        alert('ログアウトに失敗しました')
    }
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
