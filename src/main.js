import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: require('./assets/image/load-error.jpg'),
    attempt: 1
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
