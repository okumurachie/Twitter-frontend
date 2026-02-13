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
                    this.token = await user.getIdToken();
                } else {
                    this.user = null;
                    this.token = null;
                }
                this.loading = false;
            });
        },
    },
});
