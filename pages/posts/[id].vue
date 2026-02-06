<template>
    <div class="post-detail">
        <Message v-if="message" :message="message" :current-user-id="currentUserId" @like="onLike" />
        <Comment :post-id="postId" :comments="comments" @submit="onSubmitComment" />
    </div>
</template>

<script setup>
import Message from '@/components/app/Message.vue'
import Comment from '@/components/app/Comment.vue'

const route = useRoute()
const postId = Number(route.params.id)


// 仮データ
const currentUserId = 1
const { findMessage, toggleLike } = useMessages()

// グローバルstateから該当メッセージを取得
const message = computed(() => findMessage(postId))

const comments = ref([
    { id: 1, userName: 'taro', content: 'いいですね！' },
    { id: 2, userName: 'hanako', content: '応援してます' }
])

const onLike = () => {
    toggleLike(postId)
}

const onSubmitComment = (content) => {
    comments.value.push({
        id: Date.now(),
        userName: 'me',
        content
    })
}

definePageMeta({
    layout: 'app',
    title: 'コメント'
})
</script>

<style scoped>
.post-detail {
    padding: 0;
    margin: 0;
}
</style>
