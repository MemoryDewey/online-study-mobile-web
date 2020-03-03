<template>
    <div class="course-manage" v-show="show">
        <div class="course-exam-view">
            <template v-if="courses.length>0">
                <van-list v-model="loading" finished-text="已经到底啦" :finished="finished"
                          :immediate-check="false" @load="listOnload">
                    <li class="tab-list-item" v-for="(course,index) in courses"
                        :key="index">
                        <div class="tab-item-status">{{course.state | stateFilter}}</div>
                        <div class="tab-item-time">
                            <h3 class="tab-time">
                                {{course.time['startTime']}} - {{course.time['endTime']}}
                            </h3>
                        </div>
                        <div class="tab-item-content" @click="gotoExam(course['courseID'],course.state)">
                            <img class="tab-item-cover" v-lazy="getImageUrl(course['image'])" alt>
                            <div class="tab-item-main">
                                <h2 class="tab-item-title">{{course['courseName']}}</h2>
                            </div>
                        </div>
                        <div class="tab-item-btn">
                            <p class="tab-item-price">成绩：{{course.score}}</p>
                        </div>
                    </li>
                </van-list>
            </template>
            <div v-else class="list-no-data">
                <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"></svg-icon>
                <div class="no-data-text">暂无报名的课程</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getExamList} from "@/api/personal"
    import {Toast, List, Button, Notify} from "vant"
    import {getImageUrl} from "@/utils/url"

    export default {
        name: "Exam",
        filters: {
            stateFilter(state) {
                switch (state) {
                    case -1:
                        return '未参加';
                    case 0:
                        return '未开始';
                    case 1:
                        return '进行中';
                    case 2:
                        return '已完成';
                }
            }
        },
        components: {
            'van-list': List, 'van-button': Button
        },
        data() {
            return {
                show: false,
                pageSum: 0,
                loading: false,
                page: 1,
                loadingTimes: 1,
                finished: false,
                courses: [],
                getImageUrl
            }
        },
        methods: {
            async getExam(page) {
                let res = await getExamList({page});
                if (res) {
                    this.page = res.pageSum;
                    this.loading = false;
                    for (let course of res.courses) {
                        this.courses.push(course);
                    }
                    this.loadingTimes++;
                }
            },
            listOnload() {
                setTimeout(async () => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        await this.getExam(this.loadingTimes);
                        this.show = true;
                        Toast.clear();
                    }
                }, 500);
            },
            gotoExam(courseID, state) {
                if (state === 1 || state === 2)
                    this.$router.push({name: 'user-exam-question', params: {id: courseID}});
                else if (state === 0) Notify({type: 'warning', message: '该课程考试未开始'});
                else Notify({type: 'warning', message: '该课程考试已结束'})
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
        created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.listOnload();
        }
    }
</script>

<style lang="less">
    .course-exam-view {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;
    }
</style>
