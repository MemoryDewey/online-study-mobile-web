import {get, post} from '../utils/request';

export const getWalletInfo = () => get('/wallet');
export const getKey = () => get('/wallet/key');
export const getWalletLog = params => get('/wallet/logs', params);
export const getBstWalletLog = params => get('/wallet/bst-logs', params);
export const getBstBalance = params => get('/wallet/bst-balance', params);
export const getBstValue = () => get('/course/info/bst-price');
export const recharge = body => post('/wallet/recharge', body);
export const refreshRecharge = () => get('/wallet/refresh-recharge');
