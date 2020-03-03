<template>
    <div v-show="show" class="course-manage">
        <tabs v-if="allCourse.courses.length>0" v-model="activeName" color="#1989fa"
              title-active-color="#1989fa" sticky animated swipeable>
            <tab title="全部课程" name="all">
                <div class="course-manage-view">
                    <van-list v-model="allCourse.loading" finished-text="已经到底啦" :finished="allCourse.finished"
                              :immediate-check="false" @load="allListOnload">
                        <li class="tab-list-item" v-for="(course,index) in allCourse.courses"
                            :key="index">
                            <div class="tab-item-">报名成功</div>
                            <div class="tab-item-time">
                                <h3 class="tab-time">{{course['joinTime']}}</h3>
                            </div>
                            <router-link tag="div" class="tab-item-content"
                                         :to="{name: 'course-study', params: {id: course['courseID']}}">
                                <img class="tab-item-cover" v-lazy="getImageUrl(course['image'])" alt>
                                <div class="tab-item-main">
                                    <h2 class="tab-item-title">{{course['courseName']}}</h2>
                                    <p class="tab-item-price" :class="{free:course['price']===0}">
                                        {{course['price']===0?'免费':`${course['price']} 课程币`}}</p>
                                </div>
                            </router-link>
                            <div class="tab-item-btn">
                                <van-button v-if="course['price']===0" @click="cancelCourse(course['courseID'])"
                                            size="small" type="warning" round>取消报名
                                </van-button>
                                <van-button size="small" type="info" round
                                            :to="{name:'course-comment-commit',params:{id:course['courseID']}}">评价课程
                                </van-button>
                            </div>
                        </li>
                    </van-list>
                </div>
            </tab>
            <tab title="余额购买" name="balance">
                <div class="course-manage-view">
                    <van-list v-model="balanceCourse.loading" finished-text="已经到底啦" :finished="balanceCourse.finished"
                              @load="balanceListOnload">
                        <li class="tab-list-item" v-for="(course,index) in balanceCourse.courses"
                            :key="index">
                            <div class="tab-item-status">购买成功</div>
                            <div class="tab-item-time">
                                <h3 class="tab-time">{{course['createdAt']}}</h3>
                            </div>
                            <router-link tag="div" class="tab-item-content"
                                         :to="{name: 'course-study', params: {id: course['productID']}}">
                                <img class="tab-item-cover"
                                     v-lazy="getImageUrl(course['CourseInformation']['courseImage'])"
                                     alt>
                                <div class="tab-item-main">
                                    <h2 class="tab-item-title">{{course['CourseInformation']['courseName']}}</h2>
                                    <p class="tab-item-price">{{`${course['amount']} 课程币`}}</p>
                                </div>
                            </router-link>
                            <div class="tab-item-btn">
                                <van-button size="small" type="info" round
                                            :to="{name:'course-comment-commit',params:{id:course['productID']}}">评价课程
                                </van-button>
                            </div>
                        </li>
                    </van-list>
                </div>
            </tab>
            <tab title="BST购买" name="bst">
                <div class="course-manage-view">
                    <van-list v-model="bstCourse.loading" finished-text="已经到底啦" :finished="bstCourse.finished"
                              @load="bstListOnload">
                        <li class="tab-list-item" v-for="(course,index) in bstCourse.courses"
                            :key="index">
                            <div class="tab-item-status">已确认</div>
                            <div class="tab-item-time">
                                <h3 class="tab-time">{{course['createdAt']}}</h3>
                            </div>
                            <router-link tag="div" class="tab-item-content"
                                         :to="{name: 'course-study', params: {id: course['productID']}}">
                                <img class="tab-item-cover"
                                     v-lazy="getImageUrl(course['CourseInformation']['courseImage'])"
                                     alt>
                                <div class="tab-item-main">
                                    <h2 class="tab-item-title">{{course['CourseInformation']['courseName']}}</h2>
                                    <p class="tab-item-price">{{`${course['amount']} BST`}}</p>
                                </div>
                            </router-link>
                            <div class="tab-item-bottom" @click="copyTxHash(course['txHash'])">{{course['txHash']}}
                            </div>
                        </li>
                    </van-list>
                </div>
            </tab>
        </tabs>
        <div v-else class="list-no-data">
            <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"/>
            <div class="no-data-text">暂无报名的课程</div>
        </div>
    </div>
</template>

<script>
    import {Tab, Tabs, List, Button, Toast, Notify} from "vant"
    import {cancelFree, getCourse, getWalletBstCourse, getWalletCourse} from "@/api/personal"
    import {getImageUrl} from "@/utils/url"

    export default {
        name: "CourseManage",
        components: {
            Tab, Tabs, 'van-list': List, 'van-button': Button
        },
        data() {
            return {
                show: false,
                activeName: 'all',
                allCourse: {
                    loading: false,
                    page: 1,
                    loadingTimes: 1,
                    finished: false,
                    courses: []
                },
                balanceCourse: {
                    loading: false,
                    page: 1,
                    loadingTimes: 1,
                    finished: false,
                    courses: []
                },
                bstCourse: {
                    loading: false,
                    page: 1,
                    loadingTimes: 1,
                    finished: false,
                    courses: []
                },
                getImageUrl,
            }
        },
        methods: {
            async getAllCourse(page) {
                let res = await getCourse({page});
                if (res) {
                    this.allCourse.page = res['pageSum'];
                    this.allCourse.loading = false;
                    for (let course of res['courses']) {
                        this.allCourse.courses.push(course);
                    }
                    this.allCourse.loadingTimes++;
                }
            },
            allListOnload() {
                setTimeout(async () => {
                    if (this.allCourse.loadingTimes > this.allCourse.page) {
                        this.allCourse.loading = false;
                        this.allCourse.finished = true;
                    } else {
                        await this.getAllCourse(this.allCourse.loadingTimes);
                        this.show = true;
                        Toast.clear();
                    }
                }, 500);
            },
            async getBalanceCourse(page) {
                let res = await getWalletCourse({page});
                if (res) {
                    this.balanceCourse.page = res['pageSum'];
                    this.balanceCourse.loading = false;
                    for (let course of res['courses']) {
                        this.balanceCourse.courses.push(course);
                    }
                    this.balanceCourse.loadingTimes++;
                }
            },
            balanceListOnload() {
                setTimeout(async () => {
                    if (this.balanceCourse.loadingTimes > this.balanceCourse.page) {
                        this.balanceCourse.loading = false;
                        this.balanceCourse.finished = true;
                    } else {
                        await this.getBalanceCourse(this.balanceCourse.loadingTimes);
                    }
                }, 500);
            },
            async getBstCourse(page) {
                let res = await getWalletBstCourse({page});
                if (res) {
                    this.bstCourse.page = res['pageSum'];
                    this.bstCourse.loading = false;
                    for (let course of res['courses']) {
                        this.bstCourse.courses.push(course);
                    }
                    this.bstCourse.loadingTimes++;
                }
            },
            bstListOnload() {
                setTimeout(async () => {
                    if (this.bstCourse.loadingTimes > this.bstCourse.page) {
                        this.bstCourse.loading = false;
                        this.bstCourse.finished = true;
                    } else {
                        await this.getBstCourse(this.bstCourse.loadingTimes);
                    }
                }, 500);
            },
            async cancelCourse(courseID) {
                let res = await cancelFree({courseID});
                if (res) {
                    this.allCourse = {
                        loading: false,
                        page: 1,
                        loadingTimes: 1,
                        finished: false,
                        courses: []
                    };
                    this.allListOnload();
                }
            },
            copyTxHash(txHash) {
                this.$copyText(txHash).then(() => {
                    Notify({type: 'success', message: '已成功复制区块信息'});
                }).catch(() => {
                    Notify({type: 'danger', message: '您的设备暂不支持复制功能'});
                })
            }
        },
        created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.allListOnload();
        }
    }
</script>

<style lang="less">
    .course-manage-view {
        height: calc(100vh - 90px);
        position: relative;
        overflow: auto;
    }
</style>
