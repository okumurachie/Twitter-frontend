import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        token: null as string | null,
        loading: true,
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
    },

    actions: {
        initAuth() {
            const auth = getAuth();

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.user = user;
                    this.token = await user.getIdToken(true);
                } else {
                    this.user = null;
                    this.token = null;
                }
                this.loading = false;
            });
        },

        async fetchMe() {
            if (!this.token) return;

            return await $fetch('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        },
    },
});
