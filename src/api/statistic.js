import Http from "@/utils/axios.js";

export default {
    loginDetails(param) {
        return Http.post("/admin/v1/api/stat/login/details", param);
    }
};