import axios from 'axios'
import {Toast} from 'vant';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ?
        process.env.VUE_APP_BASE_API : process.env.VUE_APP_PRODUCTION_API,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers.common['Authorization'] = localStorage.getItem('token');
    return config;
});
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.status === 0) {
            Toast.fail({
                forbidClick: true,
                loadingType: 'spinner',
                message: res.msg || '错误'
            });
            return false;
        } else return res;
    }
);

export function get(url, params) {
    return service({url, method: 'get', params})
}

export function post(url, data) {
    return service({url, method: 'post', data})
}

export default service
