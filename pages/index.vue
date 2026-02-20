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
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'

const auth = useAuthStore()
const currentUserId = ref(null)

watch(
    () => auth.token,
    async (token) => {
        console.log('token changed:', token)

        if (token) {
            const me = await auth.fetchMe()
            console.log('Laravel response:', me)
            currentUserId.value = me?.id ?? null
        }
    },
    { immediate: true }
)

const { messages, toggleLike, fetchMessages } = useMessages()

onMounted(() => {
    fetchMessages()
})

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
