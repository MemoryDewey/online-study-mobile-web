import {get, post} from "@/utils/request";

export const getCourseSystemType = () => get('/course/list/system-type');
export const getListPage = data => post('/course/list/page', data);
export const getList = params => get('/course/list', params);
export const getInfo = params => get('/course/information', params);
export const getLive = params => get('/course/information/live', params);
export const getVideo = params => get('/course/information/video', params);
export const checkApply = data => post('/course/information/class', data);
export const getComment = params => get('/course/information/comment', params);
export const getCommentCount = params => get('/course/information/comment/count', params);
export const addComment = data => post('/course/information/comment', data);
export const applyFree = data => post('/course/information/apply-free', data);
