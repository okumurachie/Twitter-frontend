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
const postId = route.params.id

// 仮データ
const currentUserId = 1

const message = ref({
    id: postId,
    body: 'はじめての投稿です',
    likes: 3,
    user: {
        id: 1,
        name: 'chii'
    }
})

const comments = ref([
    { id: 1, userName: 'taro', content: 'いいですね！' },
    { id: 2, userName: 'hanako', content: '応援してます' }
])

const onLike = () => {
    message.value.liked = !message.value.liked
    message.value.likes += message.value.liked ? 1 : -1
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
