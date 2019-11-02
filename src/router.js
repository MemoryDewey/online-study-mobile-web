import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: process.env.NODE_ENV === 'development' ? 'history' : 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', name: 'home',
            component: Home,
            meta: {title: '首页'}
        },
        {
            path: '/course', name: 'course',
            component: () => import('@/views/Course'),
            meta: {title: '课程'}
        },
        {
            path: '/study/:id', name: 'course-study',
            component: () => import('@/views/Study'),
            meta: {title: '课程详情'}
        },
        {
            path: '/comment/:id', name: 'course-comment',
            component: () => import('@/views/comment'),
            redirect: {name: 'course-comment-list'},
            children: [{
                path: 'list', name: 'course-comment-list',
                component: () => import('@/views/comment/CommentList'),
                meta: {title: '评论列表'}
            }, {
                path: 'commit', name: 'course-comment-commit',
                component: () => import('@/views/comment/CommitComment'),
                meta: {title: '提交评论'}
            }]
        },
        {
            path: '/passport', name: 'passport',
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
            path: '/profile', name: 'profile',
            component: () => import('@/views/Profile'),
            meta: {title: '我的'}
        },
        {
            path: '/user', name: 'user',
            component: () => import('@/views/user'),
            redirect: {name: 'user-information'},
            children: [{
                path: 'information', name: 'user-information',
                component: () => import('@/views/user/Information'),
                meta: {title: '个人资料', requireAuth: true}
            }, {
                path: 'change-real-name', name: 'user-change-real-name',
                component: () => import('@/views/user/ChangeName'),
                meta: {title: '修改姓名', requireAuth: true}
            }, {
                path: 'change-nickname', name: 'user-change-nickname',
                component: () => import('@/views/user/ChangeName'),
                meta: {title: '修改昵称', requireAuth: true}
            }, {
                path: 'bind-email', name: 'user-bind-email',
                component: () => import('@/views/user/BindEmail'),
                meta: {title: '绑定邮箱', requireAuth: true}
            }, {
                path: 'change-phone', name: 'user-change-phone',
                component: () => import('@/views/user/ChangePhone'),
                meta: {title: '更换绑定手机', requireAuth: true}
            }, {
                path: 'balance', name: 'user-balance',
                component: () => import('@/views/user/balance'),
                meta: {title: '我的余额', requireAuth: true}
            }, {
                path: 'balance-intro', name: 'user-balance-intro',
                component: () => import('@/views/user/balance/BalanceIntro'),
                meta: {title: '余额说明', requireAuth: true}
            }, {
                path: 'balance-log', name: 'user-balance-log',
                component: () => import('@/views/user/balance/BalanceLog'),
                meta: {title: '余额明细', requireAuth: true}
            }, {
                path: 'collection', name: 'user-collection',
                component: () => import('@/views/user/Collection'),
                meta: {title: '收藏', requireAuth: true}
            }, {
                path: 'course-manage', name: 'user-course-manage',
                component: () => import('@/views/user/CourseManage'),
                meta: {title: '课程管理', requireAuth: true}
            }, {
                path: 'invite', name: 'user-invite',
                component: () => import('@/views/user/invite'),
                meta: {title: '邀请好友', requireAuth: true}
            }, {
                path: 'invite-intro', name: 'user-invite-intro',
                component: () => import('@/views/user/invite/InviteIntro'),
                meta: {title: '邀请说明', requireAuth: true}
            }]
        },
        {
            path: '/wallet', name: 'wallet',
            component: () => import('@/views/wallet'),
            redirect: {name: 'wallet-info'},
            children: [{
                path: 'info', name: 'wallet-info',
                component: () => import('@/views/wallet/WalletInfo'),
                meta: {title: '我的钱包', requireAuth: true}
            }, {
                path: 'recharge', name: 'wallet-recharge',
                component: () => import('@/views/wallet/Recharge'),
                meta: {title: '课程币充值', requireAuth: true}
            }, {
                path: 'bst-log', name: 'wallet-bst-log',
                component: () => import('@/views/wallet/BSTLog'),
                meta: {title: 'BST账单', requireAuth: true}
            }]
        }
    ]
})
