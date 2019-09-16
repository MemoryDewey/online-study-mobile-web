import {get, post} from '@/utils/request';

export const getIndexCourse = () => get('/course/list/new');
export const getIndexBanner = () => get('/course/list/banner');
