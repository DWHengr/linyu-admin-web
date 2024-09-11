import Http from "@/utils/axios";

export default {
    login(param) {
        return Http.post("/admin/v1/api/login", param);
    },
    publicKey() {
        return Http.get("/v1/api/login/public-key");
    },
};
