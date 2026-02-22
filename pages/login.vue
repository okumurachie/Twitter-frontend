<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from "firebase/auth"

definePageMeta({
    layout: 'auth'
})

const { $auth } = useNuxtApp()

const schema = yup.object({
    email: yup
        .string()
        .required('メールアドレスを入力してください')
        .email('正しいメール形式で入力してください'),
    password: yup
        .string()
        .required('パスワードを入力してください')
})

const { handleSubmit, errors } = useForm({
    validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
    await signOut($auth)
    console.log("Signed out first")
    isLoading.value = true

    try {
        const userCredential = await signInWithEmailAndPassword(
            $auth,
            values.email,
            values.password
        )
        console.log("Firebase logged in user:", userCredential.user.email)
        const token = await userCredential.user.getIdToken()

        const authStore = useAuthStore()
        authStore.token = token

        console.log("NEW TOKEN UID:", userCredential.user.uid)
        console.log("NEW TOKEN:", token)

        await navigateTo('/')
    } catch (error: any) {
        console.error('ログインエラー:', error)
        if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password'
        ) {
            alert('メールアドレスまたはパスワードが間違っています')
        } else {
            alert('ログインに失敗しました')
        }
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <AuthCard>
        <h2 class="title">ログイン</h2>
        <form class="form" @submit.prevent="onSubmit">
            <div class="form-group">
                <input v-model="email" type="email" placeholder="メールアドレス" :class="{ 'error': errors.email }" />
                <span v-if="errors.email" class="error-message">
                    {{ errors.email }}
                </span>
            </div>
            <div class="form-group">
                <input v-model="password" type="password" placeholder="パスワード" :class="{ 'error': errors.password }"
                    autocomplete="current-password" />
                <span v-if="errors.password" class="error-message">
                    {{ errors.password }}
                </span>
            </div>
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'ログイン中...' : 'ログイン' }}
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

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>
