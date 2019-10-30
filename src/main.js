import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/flexible'
import VueLazyLoad from "vue-lazyload"
import VueClipboard from "vue-clipboard2"
import VueSvgIconPlugin from "vue-svgicon"
import {VueHammer} from "vue2-hammer"
import {checkLogin} from './api/passport'

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: require('./assets/image/load-error.jpg'),
    attempt: 1
});
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
VueHammer.config.press = {
    time: 500
};
Vue.use(VueHammer);
Vue.use(VueSvgIconPlugin, {tagName: "svg-icon"});
router.beforeEach((to, from, next) => {
    if (to.meta.title) document.title = `区块链在线学习平台 - ${to.meta.title}`;
    if (to.meta.requireAuth) {
        if (store.state.loginState) next();
        else {
            checkLogin().then(res => {
                if (res.status === 1) {
                    store.commit('login', {
                        nickname: res.data.nickname, avatarUrl: res.data.avatarUrl
                    });
                    next();
                } else next('/passport')
            }).catch(() => {
                next('/passport')
            })
        }
    } else next();
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
