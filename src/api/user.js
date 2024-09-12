import Http from "@/utils/axios";

export default {
    page(param) {
        return Http.post("/admin/v1/api/user/page", param);
    },
};
