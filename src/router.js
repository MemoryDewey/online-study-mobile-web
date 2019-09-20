import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router);

export default new Router({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {title: '首页'}
        },
        {
            path: '/course',
            name: 'course',
            component: () => import('@/views/Course'),
            meta: {title: '课程'}
        },
        {
            path: '/passport',
            name: 'passport',
            component: () => import('@/views/passport'),
            redirect: {name: 'login-account'},
            children: [{
                path: 'login-account', name: 'login-account',
                component: () => import('@/views/passport/LoginAccount'),
                meta: {title: '账号密码登录'}
            }, {
                path: 'login-phone', name: 'login-phone',
                component: () => import('@/views/passport/LoginPhone'),
                meta: {title: '短信验证码登录'}
            }, {
                path: 'short-message-verify', name: 'short-message',
                component: () => import('@/views/passport/ShortMessageCode'),
                meta: {title: '短信验证码'}
            }, {
                path: 'reset-password', name: 'reset-password',
                component: () => import('@/views/passport/ResetPassword'),
                meta: {title: '重置密码'}
            }]
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/Profile'),
            meta: {title: '我的'}
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/user'),
            redirect: {name: 'user-information'},
            children: [{
                path: 'information', name: 'user-information',
                component: () => import('@/views/user/Information'),
                meta: {title: '个人资料', requireAuth: true}
            }]
        }
    ]
})
