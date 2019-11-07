<template>
    <div class="home">
        <div class="head-search">
            <search v-model="searchValue" placeholder="请输入课程关键词"
                    @search="searchCourse"></search>
        </div>
        <main v-show="indexShow">
            <div class="banner">
                <swipe :autoplay="3000">
                    <swipe-item v-for="banner in banners" :key="banner.id">
                        <img v-lazy="getImageUrl(banner.image)" alt/>
                    </swipe-item>
                </swipe>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head" style="color: #ff976a">
                        <svg-icon data="@icon/time.svg" color="#ff976a"></svg-icon>
                        限时抢购
                    </van-col>
                </van-row>
                <row-list :list-data="discountCourse">
                    <template v-slot:item="{item}">
                        <course-card-row :title="item.title" :image="item.image" tag="限时抢购" :id="item.id"
                                         :sales="item.sales" :price="item.price" :origin-price="item.originPrice"
                                         bottom="马上抢购"></course-card-row>
                    </template>
                </row-list>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head" style="color: #07c160">
                        <svg-icon data="@icon/new.svg" color="#07c160"></svg-icon>
                        最新课程
                    </van-col>
                    <van-col span="12" class="tail">
                        <router-link to="/course" tag="span">全部</router-link>
                    </van-col>
                </van-row>
                <course-card-col v-for="course in newCourses" :key="course['courseID']" :id="course['courseID']"
                                 :title="course['courseName']" :desc="course['courseDescription']"
                                 :rate="course['favorableRate']" :sales="course['applyCount']"
                                 :image="course['courseImage']" :price="course['price']">
                </course-card-col>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head" style="color: #ee0a24">
                        <svg-icon data="@icon/hot.svg" color="#ee0a24"></svg-icon>
                        热门课程
                    </van-col>
                </van-row>
                <course-card-col v-for="course in recommendCourse" :key="course['courseID']" :id="course['courseID']"
                                 :title="course['courseName']" :desc="course['courseDescription']"
                                 :rate="course['favorableRate']" :sales="course['applyCount']"
                                 :image="course['courseImage']" :price="course['price']">
                </course-card-col>
            </div>
            <div class="main-item">
                <divider>我也是有底线的</divider>
            </div>
        </main>
    </div>
</template>

<script>
    import CourseCardRow from "@/components/CourseCardRow"
    import CourseCardCol from "@/components/CourseCardCol"
    import RowList from "@/components/RowList"
    import {NavBar, Swipe, SwipeItem, Search, Row, Col, Divider} from 'vant'
    import {getIndexBanner, getIndexCourse} from "@/api/home"
    import {getImageUrl} from '@/utils/image'
    import {getDiscount, getRecommend} from "@/api/course"

    export default {
        name: 'home',
        components: {
            RowList,
            CourseCardCol, CourseCardRow,
            SwipeItem, Swipe, Search, NavBar, Divider,
            "van-row": Row, "van-col": Col
        },
        data() {
            return {
                indexShow: false,
                newCourses: [],
                banners: [],
                getImageUrl,
                discountCourse: [],
                recommendCourse: [],
                searchValue: null,
                height: 0
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
                this.indexShow = true;
            },
            async getDiscountCourse() {
                const res = await getDiscount();
                if (res) {
                    for (let course of res.courses) {
                        if (new Date(course['discountTime']).getTime() > new Date().getTime()) {
                            this.discountCourse.push({
                                id: course['courseID'],
                                title: course['courseName'],
                                image: course['courseImage'],
                                sales: course['applyCount'],
                                originPrice: course['price'],
                                price: (course['price'] * course['discount'] / 100).toFixed(2)
                            })
                        }
                    }
                }
            },
            async getRecommendCourse() {
                const res = await getRecommend();
                if (res) this.recommendCourse = res['course'];
            },
            searchCourse(value) {
                this.$router.push({path: '/course', query: {search: value}});
            }
        },
        beforeCreate() {
            this.$emit('setTab', true);
        },
        async created() {
            this.getBanner();
            this.getNewCourse();
            this.getDiscountCourse();
            this.getRecommendCourse();
        }
    }
</script>

<style lang="less">
    .home {

        .head-search {
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 1;
            position: fixed;
        }

        main {
            position: relative;
            overflow: auto;
            margin-top: 54px;
            height: calc(100vh - 54px);

            .banner {
                padding: 0 0 12px;

                .van-swipe {
                    .van-swipe-item {
                        img {
                            width: 100vw;
                            height: calc(100vw / 16 * 9);
                        }
                    }
                }
            }

            .main-item {
                padding: 10px 10px 0;
                line-height: 15px;

                .head {
                    font-size: 15px;
                    font-weight: 600;

                    svg {
                        width: 15px;
                        height: 15px;
                        margin-right: 10px;
                    }
                }

                .tail {
                    text-align: right;
                    font-size: 13px;
                    color: rgba(69, 90, 100, 0.6);
                }

                &:last-child {
                    padding-bottom: 50px;
                }

            }
        }
    }
</style>
