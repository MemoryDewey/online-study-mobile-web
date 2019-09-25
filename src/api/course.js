import {get, post} from "@/utils/request";

export const getCourseSystemType = () => get('/course/list/system-type');
export const getListPage = data => post('/course/list/page', data);
export const getList = params => get('/course/list', params);
export const getInfo = params => get('/course/information', params);

