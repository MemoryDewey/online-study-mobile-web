<template>
    <div class="home">
        <div class="head-search">
            <search placeholder="请输入课程关键词"></search>
        </div>
        <main>
            <div class="banner">
                <swipe :autoplay="3000">
                    <swipe-item v-for="banner in banners" :key="banner.id">
                        <img v-lazy="banner.image" alt/>
                    </swipe-item>
                </swipe>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">最新课程</van-col>
                    <van-col span="12" class="tail">全部</van-col>
                </van-row>
                <course-card-col v-for="course in newCourses" :key="course['courseID']"
                                 :title="course['courseName']" :desc="course['courseDescription']"
                                 :rate="course['favorableRate']" :sales="course['applyCount']"
                                 :image="course['courseImage']" :price="course['price']"></course-card-col>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">火热抢购</van-col>
                </van-row>
                <section class="hot-course">
                    <div class="course-wrap">
                        <ul class="course-list">
                            <li class="course-item">
                                <course-card-row></course-card-row>
                            </li>
                            <li class="course-item">
                                <course-card-row></course-card-row>
                            </li>
                            <li class="course-item">
                                <course-card-row></course-card-row>
                            </li>
                            <li class="course-item">
                                <course-card-row></course-card-row>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">行业资讯</van-col>
                    <van-col span="12" class="tail">全部</van-col>
                </van-row>
                <div class="information">
                    <ul class="info-list">
                        <li class="info-item">
                            <van-row>
                                <van-col span="3">
                                    <div class="info-image">
                                        <img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt>
                                    </div>
                                </van-col>
                                <van-col span="21">
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very mach</div>
                                    <div class="info-read">999人已读</div>
                                </van-col>
                            </van-row>
                        </li>
                        <li class="info-item">
                            <van-row>
                                <van-col span="3">
                                    <div class="info-image">
                                        <img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt>
                                    </div>
                                </van-col>
                                <van-col span="21">
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very mach</div>
                                    <div class="info-read">999人已读</div>
                                </van-col>
                            </van-row>
                        </li>
                        <li class="info-item">
                            <van-row>
                                <van-col span="3">
                                    <div class="info-image">
                                        <img src="https://img.yzcdn.cn/vant/t-thirt.jpg" alt>
                                    </div>
                                </van-col>
                                <van-col span="21">
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very mach</div>
                                    <div class="info-read">999人已读</div>
                                </van-col>
                            </van-row>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import CourseCardCol from "@/components/CourseCardCol"
    import CourseCardRow from "@/components/CourseCardRow"
    import {NavBar, Swipe, SwipeItem, Search, Row, Col} from 'vant'
    import {getIndexBanner, getIndexCourse} from "@/api/home"

    export default {
        name: 'home',
        components: {
            CourseCardCol, CourseCardRow,
            SwipeItem, Swipe, Search, NavBar,
            "van-row": Row, "van-col": Col
        },
        data() {
            return {
                newCourses: [],
                banners: [],
            }
        },
        methods: {
            async getNewCourse() {
                const res = await getIndexCourse();
                if (res) this.newCourses = res['courses'];
            },
            async getBanner() {
                const res = await getIndexBanner();
                if (res) this.banners = res.banners;
            }
        },
        created() {
            this.getNewCourse();
            this.getBanner();
        }
    }
</script>

<style lang="less">
    .home {
        @home-head-height: 54px;
        .head-search {
            top: 0;
            left: 0;
            width: 100%;
            line-height: @home-head-height;
            height: @home-head-height;
            text-align: center;
            z-index: 1;
            position: fixed;
        }

        main {
            position: relative;
            overflow: auto;
            margin-top: @home-head-height;
            height: calc(100vh - @home-head-height - 50px);

            .banner {
                padding: 0 12px 10px;

                .van-swipe {
                    .van-swipe-item {
                        img {
                            width: 100%;
                            height: calc(100vw / 16 * 9);
                        }
                    }
                }
            }

            .main-item {
                padding: 1.2vh 3vw 0;
                line-height: 2.2vh;

                .head {
                    font-size: 2.2vh;
                    font-weight: 600;
                }

                .tail {
                    text-align: right;
                    font-size: 1.8vh;
                    color: rgba(69, 90, 100, 0.6);
                }

            }

            .hot-course {
                overflow: hidden;
                position: relative;

                .course-wrap {
                    overflow-x: auto;
                    overflow-y: hidden;
                    position: relative;
                    margin-bottom: -1vh;
                }

                .course-list {
                    list-style: none;
                    white-space: nowrap;
                    padding: 1vh 0;
                }

                .course-item {
                    display: inline-block;
                    position: relative;
                    margin-right: 4vw;
                }
            }

            .information {
                padding: 1vh 0;

                .info-list {
                    margin-bottom: 1vh;
                }

                .info-item {
                    margin-bottom: 1vh;

                    .info-image {
                        width: 10vw;
                        height: 10vw;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }
                    .info-title{
                        font-size: 2vh;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .info-read{
                        font-size: 1.5vh;
                        margin-top: 0.75vh;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
