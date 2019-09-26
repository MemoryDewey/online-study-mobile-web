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
        },
        isLive: false,
        videoUrl: ''
    },
    getters: {
        getVideoUrl: state => {
            return state.videoUrl;
        },
        getIsLive: state => {
            return state.isLive;
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
            state.userInfo = {
                nickname: '', avatarUrl: '',
                birthday: '', sex: '',
                realName: '', bstAddress: '',
                email: '', mobile: ''
            };
            localStorage.removeItem('token');
        },
        setInfo: (state, payload) => {
            state.hasInfo = true;
            state.userInfo = payload;
        },
        changeInfo: (state, payload) => {
            state.userInfo[payload.key] = payload.value;
        },
        changeVideo: (state, payload) => {
            state.isLive = payload.isLive;
            state.videoUrl = payload.videoUrl;
        }
    },
    actions: {}
})
