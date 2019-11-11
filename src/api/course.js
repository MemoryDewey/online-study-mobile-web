import {get, post} from "@/utils/request";

export const getCourseSystemType = () => get('/course/list/system-type');
export const getListPage = data => post('/course/list/page', data);
export const getList = params => get('/course/list', params);
export const getRecommend = () => get('/course/list/recommend');
export const getDiscount = () => get('/course/list/discount');
export const getCollection = () => get('/course/list/collection-all');

export const getInfo = params => get('/course/information', params);
export const getLive = params => get('/course/information/live', params);
export const getVideo = params => get('/course/information/video', params);
export const checkApply = data => post('/course/information/class', data);
export const getComment = params => get('/course/information/comment', params);
export const getCommentCount = params => get('/course/information/comment/count', params);
export const addComment = data => post('/course/information/comment', data);
export const applyFree = data => post('/course/information/apply-free', data);
export const collectCourse = params => get('/course/information/collect-course', params);
export const deleteCollection = data => post('/course/information/collection/delete', data);
export const checkBstConfirmation = params => get('/course/information/check-bst-confirmation', params);
export const applyCourseByBalance = data => post('/course/information/buy-course', data);
export const applyChargeByBst = data => post('/course/information/buy-course-bst', data);
export const checkBstStatue = params => get('/course/information/buy-course-bst/statue', params);
export const getExam = data => post('/examine/exam', data);
export const addExam = data => post('/examine/add', data);
