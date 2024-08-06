import {ref, reactive} from 'vue';

export const useChatStore = () => {
    const isVisible = ref(false);
    const chatData = reactive({
        userid: ''
    });

    const showChat = (userid) => {
        chatData.userid = userid;
        isVisible.value = true;
    };

    const closeChat = () => {
        isVisible.value = false;
    };

    return {
        isVisible,
        chatData,
        showChat,
        closeChat
    };
};