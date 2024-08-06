import {useChatStore} from "@/use/UseChat/chatStore.js";


export const storePlugin = {
    install: (app) => {
        const chatStore = useChatStore();
        app.provide('chatStore', chatStore);
    }
}