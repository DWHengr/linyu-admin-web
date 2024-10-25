import Http from "@/utils/axios";

export default {
    list() {
        return Http.get("/admin/v1/api/conversation/list");
    },
    create(param) {
        return Http.formData("/admin/v1/api/conversation/create", param)
    },
    update(param) {
        return Http.formData("/admin/v1/api/conversation/update", param)
    },
    delete(param) {
        return Http.post("/admin/v1/api/conversation/delete", param)
    },
    resetSecret(param) {
        return Http.post("/admin/v1/api/conversation/reset/secret", param)
    },
    disable(param) {
        return Http.post("/admin/v1/api/conversation/disable", param)
    },
    unDisable(param) {
        return Http.post("/admin/v1/api/conversation/undisable", param)
    },
};
