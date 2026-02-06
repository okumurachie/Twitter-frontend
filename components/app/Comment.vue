<template>
    <div class="comment-item">
        <div class="comment-header">
            <h2 class="comment-title">コメント</h2>
        </div>
        <div class="comment-inner">
            <div class="comment-list">
                <div v-for="comment in comments" :key="comment.id" class="comment-body">
                    <div class="commet-body-wrapper">
                        <div class="user">{{ comment.userName }}</div>
                        <div class="content">{{ comment.content }}</div>
                    </div>
                </div>
            </div>
            <div class="comment-form">
                <div class="form-input">
                    <input class="comment-form-input" v-model="text" type="text" placeholder="コメントを書く" />
                </div>
                <div class="form-button">
                    <button class="comment-button" @click="submit">コメント</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    postId: Number,
    comments: Array
})

const emit = defineEmits(['submit'])

const text = ref('')

const submit = () => {
    if (!text.value) return
    emit('submit', text.value)
    text.value = ''
}
</script>

<style scoped>
.comment-item {
    padding: 0;
    width: 100%;
    background-color: #000;
    border-bottom: 1px solid #fff;
    color: #fff;
}

.comment-inner,
.comment-list {
    padding: 0;
    width: 100%;
}

.comment-form {
    padding-top: 30px;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-input {
    width: 100%;
    display: flex;
    justify-content: center;
}

.comment-form-input {
    width: 90%;
    height: 30px;
    background-color: #000;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 10px;
}

.form-button {
    width: 99%;
    display: flex;
    justify-content: flex-end;
}

.comment-body {
    padding: 0;
    border-bottom: 1px solid #fff;
}

.commet-body-wrapper {
    height: auto;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.comment-header {
    height: 50px;
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #fff;
}

.comment-title {
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.comment-button {
    width: 100px;
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

.comment-button:hover {
    background: #156eaa;
    transform: translateY(-1px);
}

.user {
    font-size: 20px;
}

.content {
    font-size: 14px;
}
</style>
