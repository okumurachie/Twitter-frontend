<template>
    <div class="app-layout">
        <SideNav :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
        <div class="app-main">
            <div class="main-header">
                <button class="hamburger" @click="isSidebarOpen = true">
                    ☰
                </button>
                <h1 class="page-title">{{ route.meta.title }}</h1>
            </div>
            <section class="main-content">
                <NuxtPage :key="route.fullPath" />
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from '@/components/app/SideNav.vue'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const isSidebarOpen = ref(false)

watch(
    () => authStore.loading,
    async (loading) => {
        if (!loading && authStore.isLoggedIn) {
            const response = await authStore.fetchMe()
            console.log('Laravel response:', response)
        }
    }
)
</script>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    background-color: #000;
    color: #fff;
}

.hamburger {
    display: none;
    font-size: 28px;
    background: none;
    border: none;
    color: #fff;
    padding: 8px;
    cursor: pointer;
}

.app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #fff;
}

.main-header {
    height: 64px;
    border-bottom: 1px solid #fff;
    display: flex;
}

.page-title {
    font-size: 24px;
    padding-left: 20px;
    font-weight: bold;
}

.main-content {
    min-height: 128px;
    padding: 0;
    overflow-y: auto;
}

@media (max-width: 767px) {
    .hamburger {
        display: block;
    }

    .main-header {
        padding: 8px 12px;
        border-bottom: 1px solid #fff;
        position: sticky;
        top: 0;
        background: #000;
        z-index: 10;
    }

    .page-title {
        font-size: 24px;
    }

    .main-content {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
    }
}

@media (min-width: 768px) {
    :deep(.sidebar) {
        width: 25%;
        min-width: 220px;
        max-width: 300px;
    }
}
</style>
