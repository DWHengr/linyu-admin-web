import Http from "@/utils/axios.js";

export default {
    loginDetails(param) {
        return Http.post("/admin/v1/api/stat/login/details", param);
    },
    numInfo() {
        return Http.get("/admin/v1/api/stat/num/info");
    },
    top10Msg() {
        return Http.get("/admin/v1/api/stat/top10/msg");
    }
};