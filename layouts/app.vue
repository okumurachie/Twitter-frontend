<template>
    <div class="app-layout">
        <SideNav />
        <div class="app-main">
            <div class="main-header">
                <h1 class="page-title">{{ route.meta.title }}</h1>
            </div>
            <section class="main-content">
                <NuxtPage :key="route.fullPath" />
            </section>
        </div>
    </div>
</template>

<script setup>
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
    padding: 0;
    overflow-y: auto;
}

@media (max-width: 767px) {
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
</style>
