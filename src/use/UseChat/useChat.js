import { inject } from 'vue';

export function useChat() {
    const chatStore = inject('chatStore');

    if (!chatStore) {
        throw new Error('chatStore not provided');
    }

    return chatStore;
}