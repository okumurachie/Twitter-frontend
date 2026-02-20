import { useAuthStore } from '@/stores/auth';
export const useMessages = () => {
    const messages = useState('messages', () => []);
    const user = useState('user');

    const fetchMessages = async () => {
        try {
            const res = await $fetch('http://localhost:8000/api/posts');
            messages.value = res.map((post) => ({
                id: post.id,
                body: post.content,
                user: post.user,
                likes: post.likes_count ?? post.likes?.length ?? 0,
                liked: post.liked ?? false,
                user_id: post.user_id,
            }));
        } catch (error) {
            console.error('投稿失敗', error);
        }
    };

    const createMessage = async (content) => {
        const auth = useAuthStore();

        if (!auth.token) {
            return navigateTo('/login');
        }

        const res = await $fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
            body: { content },
        });

        // 即時反映
        messages.value.unshift({
            id: res.id,
            body: res.content,
            user: res.user,
            likes: 0,
            liked: false,
            user_id: res.user_id,
        });

        return res;
    };
    const findMessage = (id) => {
        return messages.value.find((messages) => messages.id === Number(id));
    };

    const toggleLike = async (id) => {
        if (!user.value) {
            return navigateTo('/login');
        }

        try {
            const res = await $fetch(
                `http://localhost:8000/api/posts/${id}/like`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${user.value.token}`,
                    },
                },
            );

            const target = findMessage(id);
            if (!target) return;

            target.liked = res.liked;
            target.likes += res.liked ? 1 : -1;
        } catch (error) {
            if (error.response?.status === 401) {
                return navigateTo('/login');
            }
            console.error('いいね失敗, error');
        }
    };

    return {
        messages,
        fetchMessages,
        findMessage,
        toggleLike,
        createMessage,
    };
};
