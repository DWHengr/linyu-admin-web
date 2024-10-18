import Http from "@/utils/axios.js";

export default {
    sendMsg(param) {
        return Http.post("/v1/api/message/send", param);
    },
    record(param) {
        return Http.post("/v1/api/message/record", param);
    },
    getMedia(param) {
        return Http.get("/v1/api/message/get/media", param)
    },
};