import Http from "@/utils/axios";

export default {
    page(param) {
        return Http.post("/admin/v1/api/user/page", param);
    },
    create(param) {
        return Http.post("/admin/v1/api/user/create", param);
    },
    delete(param) {
        return Http.post("/admin/v1/api/user/delete", param)
    },
    disable(param) {
        return Http.post("/admin/v1/api/user/disable", param)
    },
    unDisable(param) {
        return Http.post("/admin/v1/api/user/undisable", param)
    },
    update(param) {
        return Http.post("/admin/v1/api/user/update", param)
    },
    resetPassword(param) {
        return Http.post("/admin/v1/api/user/reset/password", param)
    },
    setAdmin(param) {
        return Http.post("/admin/v1/api/user/set/admin", param)
    },
    cancelAdmin(param) {
        return Http.post("/admin/v1/api/user/cancel/admin", param)
    },
    unread() {
        return Http.get(`/v1/api/user/unread`)
    },
};
