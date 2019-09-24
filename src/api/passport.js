import {post, get} from '@/utils/request';

export const sendMessage = data => post('/passport/short-message-captcha', data);
export const login = data => post('/passport/m-login', data);
export const reset = data => post('/passport/reset', data);
export const loginByPsw = data => post('/passport/m-login-psw', data);
export const checkLogin = () => get('/passport/check-login');
export const logout = () => get('/passport/logout');
export const deleteEmail = () => get('/passport/delete-email');
export const sendEmail = data => post('/passport/email-captcha', data);
export const addEmail = data => post('/passport/add-email', data);
