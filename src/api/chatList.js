import Http from "@/utils/axios";

export default {
    chatList() {
        return Http.get("/v1/api/chat-list/list");
    }
};
