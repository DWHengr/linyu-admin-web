import Http from "@/utils/axios";

export default {
    list() {
        return Http.get("/admin/v1/api/notify/system/list");
    },
};
