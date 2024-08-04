import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/login/Login.vue";
import Home from "@/router/home.js";

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

export default router
