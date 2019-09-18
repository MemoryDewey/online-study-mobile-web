import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/course',
            name: 'course',
            component: () => import('@/views/Course')
        },
        {
            path: '/passport',
            name: 'passport',
            component: () => import('@/views/passport'),
            redirect: {name: 'login-account'},
            children: [
                {
                    path: 'login-account', name: 'login-account',
                    component: () => import('@/views/passport/LoginAccount')
                },
                {
                    path: 'login-phone', name: 'login-phone',
                    component: () => import('@/views/passport/LoginPhone')
                },
                {
                    path: 'short-message-verify', name: 'short-message',
                    component: () => import('@/views/passport/ShortMessageCode')
                }
            ]
        }
    ]
})
