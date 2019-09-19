import {post, get} from '@/utils/request';

export const sendMessage = data => post('/passport/short-message-captcha', data);
export const login = data => post('/passport/m-login', data);
export const reset = data => post('/passport/reset', data);
export const loginByPsw = data => post('/passport/m-login-psw', data);
