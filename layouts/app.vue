<template>
    <div class="app-layout">
        <SideNav />
        <div class="app-main">
            <div class="main-header">
                <h1 class="page-title">{{ route.meta.title }}</h1>
            </div>
            <section class="main-content">
                <slot />
            </section>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import SideNav from '@/components/app/SideNav.vue'
const route = useRoute()
</script>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    background-color: #000;
    color: #fff;
}

:deep(.sidebar) {
    width: 25%;
    min-width: 220px;
    max-width: 300px;
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
    padding: 16px;
    border-bottom: 1px solid #fff;
    overflow-y: auto;
}
</style>
