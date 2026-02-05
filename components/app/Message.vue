<template>
    <div class="message-item">
        <div class="message-inner">
            <div class="message-header">
                <span class="username">
                    {{ message.user.name }}
                </span>

                <div class="actions">
                    <button class="icon-button" @click="toggleLike">
                        <img src="/images/heart.png" alt="like" />
                        <span class="like-count">{{ message.likes }}</span>
                    </button>

                    <button v-if="isMyPost" class="icon-button" @click="deletePost">
                        <img src="/images/cross.png" alt="delete" />
                    </button>

                    <NuxtLink :to="`/posts/${message.id}`" class="icon-button">
                        <img src="/images/detail.png" alt="create" />
                    </NuxtLink>
                </div>
            </div>

            <div class="message-body">
                {{ message.body }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: Object,
        required: true
    },
    currentUserId: {
        type: Number,
        required: true
    }
})

const isMyPost = computed(() => {
    return props.message.user.id === props.currentUserId
})

const emit = defineEmits(['like'])

const toggleLike = () => {
    emit('like', props.message.id)
}

const deletePost = () => {
    // 仮：emitで親に通知
    console.log('delete', props.message.id)
}
</script>

<style scoped>
.message-item {
    width: 100%;
    background-color: #000;
    border-bottom: 1px solid #fff;
}

.message-inner {
    padding: 16px 18px;
    color: #fff;

}

.message-header {
    display: flex;
    gap: 12px;
}

.username {
    font-weight: bold;
    font-size: 24px;
}

.actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.icon-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}

.icon-button img {
    width: 24px;
    height: 24px;
}

.like-count {
    font-size: 18px;
}

.message-body {
    margin-top: 6px;
    font-size: 14px;
    /* ①より小さめ */
    line-height: 1.6;
    color: #e7e9ea;
    white-space: pre-wrap;
    /* 改行対応 */
}
</style>
