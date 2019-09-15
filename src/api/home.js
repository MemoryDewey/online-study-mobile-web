import {get, post} from '@/utils/request';

export const getHomeCourse = () => get('/course/list/index-show');
