import Http from "@/utils/axios";

export default {
    chatList() {
        return Http.get("/v1/api/chat-list/list");
    },
    read(param) {
        return Http.get(`/v1/api/chat-list/read/${param}`)
    },
    create(param) {
        return Http.post("/v1/api/chat-list/create", param);
    },
};
