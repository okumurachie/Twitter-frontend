<script setup>
definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <AuthCard>
        <h2 class="title">新規登録</h2>

        <form class="form">
            <input type="text" placeholder="ユーザーネーム" />

            <input type="email" placeholder="メールアドレス" />

            <input type="password" placeholder="パスワード" />

            <button type="submit">
                新規登録
            </button>
        </form>
    </AuthCard>
</template>

<style scoped>
.register-card {
    margin: 100px auto;
    width: 35%;
    min-width: 320px;
    background: #fff;
    color: #000;
    padding: 20px 32px;
    border-radius: 8px;
}

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
