import {get, post, del} from "@/utils/request";

export const getPersonalInfo = () => get('/profile');
export const setDefaultAvatar = () => get('/profile/default-avatar');
export const updatePersonal = data => post('/profile', data);
export const setBstWalletAddress = data => post('/profile/user-address', data);
export const deleteBstWalletAddress = () => del('/profile/user-address');
export const changePhone = data => post('/passport/change-mobile', data);
export const getCourse = params => get('/course/list/user-course', params);
export const cancelFree = params => get('/course/apply/cancel-free', params);
export const getWalletCourse = params => get('/course/list/user-course-coin', params);
export const getWalletBstCourse = params => get('/course/list/user-course-bst', params);
export const getLatestBrowseCourse = () => get('/course/list/latest-browse');
export const getInvite = params => get('/profile/invite', params);
export const getInviteCode = () => get('/profile/invite-code');
export const getFeedbackType = () => get('/profile/feedback-type');
export const submitFeedback = data => post('/profile/feedback', data);
export const getExamList = params => get('/examine/user-exam', params);

