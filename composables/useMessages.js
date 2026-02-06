export const useMessages = () => {
    const messages = useState('messages', () => [
        {
            id: 1,
            body: 'はじめての投稿です',
            likes: 3,
            liked: false,
            user: { id: 1, name: 'chii' },
        },
        {
            id: 2,
            body: 'NuxtでTwitter作成中',
            likes: 5,
            liked: true,
            user: { id: 2, name: 'taro' },
        },
    ]);

    const findMessage = (id) => {
        return messages.value.find((m) => m.id === Number(id));
    };

    const toggleLike = (id) => {
        const target = findMessage(id);
        if (!target) return;

        target.liked = !target.liked;
        target.likes += target.liked ? 1 : -1;
    };

    return {
        messages,
        findMessage,
        toggleLike,
    };
};
