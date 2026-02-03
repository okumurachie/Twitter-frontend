<script setup>
definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <AuthCard>
        <h2 class="title">ログイン</h2>

        <form class="form">
            <input type="email" placeholder="メールアドレス" />

            <input type="password" placeholder="パスワード" />

            <button type="submit">
                ログイン
            </button>
        </form>
    </AuthCard>
</template>

<style scoped>
.title {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}

.form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 20px;
}
</style>
