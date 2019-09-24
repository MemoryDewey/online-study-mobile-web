import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginState: false,
        hasInfo: false,
        userInfo: {
            nickname: '', avatarUrl: '',
            birthday: '', sex: '',
            realName: '', bstAddress: '',
            email: '', mobile: ''
        }
    },
    mutations: {
        login: (state, payload) => {
            state.loginState = true;
            state.userInfo.nickname = payload.nickname;
            state.userInfo.avatarUrl = payload.avatarUrl;
        },
        exit: state => {
            state.loginState = false;
            state.hasInfo = false;
            state.userInfo = {};
            localStorage.removeItem('token');
        },
        setInfo: (state, payload) => {
            state.hasInfo = true;
            state.userInfo = payload;
        },
        changeInfo: (state, payload) => {
            state.userInfo[payload.key] = payload.value;
        }
    },
    actions: {}
})
