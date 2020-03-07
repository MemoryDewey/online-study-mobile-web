import {get, post} from "@/utils/request";

export const getCourseSystemType = () => get('/course/list/system-type');
export const getListPage = params => get('/course/list/page', params);
export const getList = params => get('/course/list', params);
export const getCollection = () => get('/course/list/collection-all');
export const getCertificate = params => get('/course/list/certificate', params);

export const getInfo = params => get('/course/info', params);
export const getLive = params => get('/course/video/live', params);
export const getVideo = params => get('/course/video/chapter', params);
export const checkApply = params => get('/course/info/class', params);
export const getComment = params => get('/course/comment', params);
export const getCommentCount = params => get('/course/comment/count', params);
export const addComment = data => post('/course/comment', data);
export const applyFree = data => post('/course/apply/free', data);
export const collectCourse = params => get('/course/info/collect-course', params);
export const deleteCollection = data => post('/course/info/collection/delete', data);
export const checkBstConfirmation = params => get('/course/apply/check-bst-confirmation', params);
export const applyCourseByBalance = data => post('/course/apply/buy-course', data);
export const applyChargeByBst = data => post('/course/apply/buy-course-bst', data);
export const checkBstStatue = params => get('/course/apply/buy-course-bst/statue', params);
export const getExam = data => post('/examine/exam', data);
export const addExam = data => post('/examine', data);
