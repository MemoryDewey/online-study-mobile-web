import {post, get, del} from '@/utils/request';

export const sendMessage = data => post('/verify-code/message', data);
export const login = data => post('/passport/message-login', data);
export const reset = data => post('/passport/reset', data);
export const loginByPsw = data => post('/passport/m-login-psw', data);
export const checkLogin = () => get('/passport/check-login');
export const logout = () => get('/passport/logout');
export const deleteEmail = () => del('/passport/email');
export const sendEmail = data => post('/verify-code/email', data);
export const addEmail = data => post('/passport/email', data);
