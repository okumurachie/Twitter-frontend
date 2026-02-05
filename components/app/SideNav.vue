<template>
    <aside class="sidebar">
        <div class="logo">
            <img src="/images/logo.png" alt="サイドバーヘッダー" />
        </div>
        <div class="sidebar-content">
            <nav class="menu">
                <a href="#" class="menu-item">
                    <img src="/images/home.png" alt="ホームアイコン" class="menu-icon" />
                    <span>ホーム</span>
                </a>
            </nav>
            <!-- ログアウト -->
            <button class="logout">
                <img src="/images/logout.png" alt="ログアウトアイコン" class="menu-icon" />
                <span>ログアウト</span>
            </button>
            <!-- 投稿フォーム -->
            <div class="post-box">
                <label for="textarea">シェア</label>
                <textarea placeholder="ここに記入" rows="8"></textarea>
                <div class="button-wrapper">
                    <button class="post-button">シェアする</button>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 280px;
    padding: 16px;
    box-sizing: border-box;
}

.logo {
    width: 40%;
    margin: 20px 0 20px 20px;
}

.logo img {
    width: 100%;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
}

.menu-item,
.logout {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    text-decoration: none;
    color: #fff;
}

.menu-icon {
    width: 20px;
    height: 20px;
}

.post-box {
    width: 90%;
    margin: 0;
    display: flex;
    flex-direction: column;
}

.post-box * {
    box-sizing: border-box;
}

.post-box label {
    color: #fff;
    margin-bottom: 10px;
    font-size: 18px;
}

.post-box textarea {
    width: 100%;
    margin: 0 auto;
    resize: none;
    padding: 8px;
    border-radius: 8px;
    background-color: #000;
    border: 1px solid #fff;
    margin-bottom: 10px;
    font-size: 18px;
    color: #fff;
    transition: border-color 0.25s ease;
}

.post-box textarea:focus {
    outline: none;
    border-color: #1d9bf0;
}

.button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.post-button {
    width: 40%;
    margin-top: 8px;
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

.post-button:hover {
    background: #156eaa;
    transform: translateY(-1px);
}

.logout {
    margin: 20px 0;
    padding: 0;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
}

@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}
</style>
