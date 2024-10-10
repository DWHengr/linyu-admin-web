import Http from "@/utils/axios";

export default {
    list() {
        return Http.get("/admin/v1/api/notify/system/list");
    },
    delete(param) {
        return Http.post("/admin/v1/api/notify/system/delete", param);
    },
    create(param) {
        return Http.formData("/admin/v1/api/notify/system/create", param);
    }
};
