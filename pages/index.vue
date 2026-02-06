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

const currentUserId = 1

const { messages, toggleLike } = useMessages()

const onLike = (id) => {
    toggleLike(id)
}
</script>

<style scoped>
.message-content {
    padding: 0;
    margin: 0;
}
</style>
