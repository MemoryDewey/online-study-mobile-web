import {get} from '@/utils/request';

export const getIndexCourse = () => get('/course/list/new');
export const getIndexBanner = () => get('/course/list/banner');
export const getHomeCourse = () => get('/course/list/m/home');
