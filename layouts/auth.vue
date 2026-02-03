<template>
    <div class="auth-layout">
        <AuthHeader />
        <main class="auth-main">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.auth-layout {
    min-height: 100vh;
    background-color: #000;
}

/* フォームを中央に配置するためのエリア */
.auth-main {
    min-height: calc(100vh - 64px);
    /* ヘッダー分を除く */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
