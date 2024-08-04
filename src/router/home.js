export default [
    {
        path: 'main',
        name: 'main',
        component: () => import('@/views/home/Main.vue')
    },
    {
        path: 'user',
        name: 'user',
        component: () => import('@/views/home/User.vue')
    }
]