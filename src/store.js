import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginState: false,
        userInfo: {}
    },
    mutations: {
        login: (state, payload) => {
            state.loginState = true;
            state.userInfo = payload;
        },
        exit: state => {
            state.loginState = false;
            state.userInfo = {};
            localStorage.removeItem('token');
        }
    },
    actions: {}
})
