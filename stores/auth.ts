import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        token: null as string | null,
        laravelUser: null as any,
        loading: true,
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
        userId: (state) => state.laravelUser?.id ?? null,
    },

    actions: {
        initAuth() {
            const auth = getAuth();

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.user = user;
                    this.token = await user.getIdToken(true);
                    await this.fetchMe();
                } else {
                    this.user = null;
                    this.token = null;
                    this.laravelUser = null;
                }
                this.loading = false;
            });
        },

        async fetchMe() {
            if (!this.token) {
                return null;
            }

            try {
                const res = await $fetch('http://127.0.0.1:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.user = res;
                return res;
            } catch (error) {
                console.error('fetchMe error:', error);
                return null;
            }
        },
    },
});
