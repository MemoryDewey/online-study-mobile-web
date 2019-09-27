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
        videoUrl: '',
        courseImage: '',
    },
    getters: {
        getVideoUrl: state => {
            return state.videoUrl;
        },
        getCourseImage: state => {
            return state.courseImage;
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
        setCourseImage: (state, payload) => {
            state.courseImage = payload;
        },
        changeVideo: (state, payload) => {
            state.isLive = payload.isLive;
            state.videoUrl = payload.videoUrl;
        }
    },
    actions: {}
})
