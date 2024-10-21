import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/login/Login.vue";
import Home from "@/router/home.js";
import ws from "@/utils/ws.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/Index.vue'),
            redirect: '/home/main',
            children: Home
        }
    ]
})

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem('x-token')
    ws.connect(token)
    if (!token && to.path !== '/') {
        next({path: '/'})
    }
    if ((token && to.path === '/') || !to.matched.length) {
        next({path: '/home'});
    }
    next()
})

export default router
