import {get, post} from "@/utils/request";

export const getPersonalInfo = () => get('/profile/personal');
export const setDefaultAvatar = () => get('/profile/personal/default-avatar');
export const updatePersonal = data => post('/profile/personal/update', data);
export const setBstWalletAddress = data => post('/profile/personal/user-address', data);
export const deleteBstWalletAddress = () => post('/profile/personal/user-address/delete');
export const changePhone = data => post('/passport/change-mobile', data);
export const getCourse = params => get('/course/list/user-course', params);
export const cancelFree = params => get('/course/information/cancel-free', params);
export const getWalletCourse = params => get('/course/list/user-course-rmb', params);
export const getWalletBstCourse = params => get('/course/list/user-course-bst', params);
export const getLatestBrowseCourse = () => get('/course/list/latest-browse');
