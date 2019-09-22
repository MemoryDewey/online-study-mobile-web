import {get, post} from "@/utils/request";

export const getPersonalInfo = () => get('/profile/personal');
export const setDefaultAvatar = () => get('/profile/personal/default-avatar');
export const updatePersonal = data => post('/profile/personal/update', data);

