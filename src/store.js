import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginState: false,
        userInfo: {nickname: '', avatarUrl: ''}
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
        },
        changeAvatarUrl: (state, payload) => {
            state.userInfo.avatarUrl = payload;
        },
        changeNickname: (state, payload) => {
            state.userInfo.nickname = payload;
        }
    },
    actions: {}
})
