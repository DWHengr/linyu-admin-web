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
    },
    {
        path: 'notify',
        name: 'notify',
        component: () => import('@/views/home/Notify.vue')
    }, {
        path: 'conversation',
        name: 'conversation',
        component: () => import('@/views/home/Conversation.vue')
    }
]