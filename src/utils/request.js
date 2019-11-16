import axios from 'axios'
import {Toast} from 'vant';
import {getRequestBaseUrl} from "@/utils/url";

const service = axios.create({
    baseURL: getRequestBaseUrl(),
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers.common['Authorization'] = localStorage.getItem('token');
    return config;
});
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response.data.code) Toast.fail({
            forbidClick: true,
            loadingType: 'spinner',
            message: error.response.data.msg || '错误'
        });
    }
);

export function get(url, params) {
    return service({url, method: 'get', params})
}

export function post(url, data) {
    return service({url, method: 'post', data})
}

export default service
