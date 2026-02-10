<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({
    layout: 'auth'
})

const schema = yup.object({
    username: yup
        .string()
        .required('ユーザーネームを入力してください')
        .max(20, 'ユーザーネームは20文字以内で入力してください'),
    email: yup
        .string()
        .required('メールアドレスを入力してください')
        .email('正しいメール形式で入力してください'),
    password: yup
        .string()
        .required('パスワードを入力してください')
        .min(6, 'パスワードは6文字以上で入力してください')
})

const { handleSubmit, errors } = useForm({
    validationSchema: schema
})

const { value: username } = useField('username')
const { value: email } = useField('email')
const { value: password } = useField('password')

const isLoading = ref(false)

// フォーム送信処理
const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true

    try {
        // ここに実際の新規登録APIを呼び出す処理を記述
        // 例: await $fetch('/api/auth/register', { method: 'POST', body: values })

        console.log('新規登録データ:', values)

        // 成功時の処理（例: ログインページへリダイレクト）
        // await navigateTo('/login')

        alert('新規登録に成功しました')
    } catch (error) {
        console.error('新規登録エラー:', error)
        alert('新規登録に失敗しました')
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <AuthCard>
        <h2 class="title">新規登録</h2>
        <form class="form" @submit.prevent="onSubmit">
            <div class="form-group">
                <input v-model="username" type="text" placeholder="ユーザーネーム" :class="{ 'error': errors.username }" />
                <span v-if="errors.username" class="error-message">
                    {{ errors.username }}
                </span>
            </div>
            <div class="form-group">
                <input v-model="email" type="email" placeholder="メールアドレス" :class="{ 'error': errors.email }" />
                <span v-if="errors.email" class="error-message">
                    {{ errors.email }}
                </span>
            </div>
            <div class="form-group">
                <input v-model="password" type="password" placeholder="パスワード" :class="{ 'error': errors.password }" />
                <span v-if="errors.password" class="error-message">
                    {{ errors.password }}
                </span>
            </div>
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? '登録中...' : '新規登録' }}
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

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>
