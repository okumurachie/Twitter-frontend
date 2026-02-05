<template>
    <div class="message-content">
        <Message v-for="message in messages" :key="message.id" :message="message" :current-user-id="currentUserId"
            @like="onLike" />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app',
    title: 'ホーム'
})

import Message from '@/components/app/Message.vue'

const onLike = (id) => {
    const target = messages.value.find(m => m.id === id)
    if (target) target.likes++
}

const currentUserId = 1

const messages = ref([
    {
        id: 1,
        body: 'はじめての投稿です',
        likes: 3,
        user: { id: 1, name: 'chii' }
    },
    {
        id: 2,
        body: 'NuxtでTwitter作成中',
        likes: 5,
        user: { id: 2, name: 'taro' }
    }
])
</script>

<style scoped>
.message-content {
    padding: 0;
    margin: 0;
}
</style>
