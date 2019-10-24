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
                    <van-col span="12" class="head">最新课程</van-col>
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
                    <van-col span="12" class="head">限时抢购</van-col>
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
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very
                                        mach
                                    </div>
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
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very
                                        mach
                                    </div>
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
                                    <div class="info-title">What's you problem? Hello, thank you, thank you very
                                        mach
                                    </div>
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
    import CourseCardRow from "@/components/CourseCardRow"
    import CourseCardCol from "@/components/CourseCardCol"
    import RowList from "@/components/RowList"
    import {NavBar, Swipe, SwipeItem, Search, Row, Col} from 'vant'
    import {getIndexBanner, getIndexCourse} from "@/api/home"
    import {getImageUrl} from '@/utils/image'
    import {getDiscount} from "@/api/course"

    export default {
        name: 'home',
        components: {
            RowList,
            CourseCardCol, CourseCardRow,
            SwipeItem, Swipe, Search, NavBar,
            "van-row": Row, "van-col": Col
        },
        data() {
            return {
                indexShow: false,
                newCourses: [],
                banners: [],
                getImageUrl,
                discountCourse: [],
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
            this.height = window.innerHeight;
            window.onresize = () => {
                if (window.innerHeight < this.height) {
                    this.$emit('setTab', false);
                } else {
                    this.$emit('setTab', true);
                }
            };
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
                padding: 15px 10px 0;
                line-height: 15px;

                .head {
                    font-size: 15px;
                    font-weight: 600;
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

            .information {
                padding: 10px 0;

                .info-list {
                    margin-bottom: 10px;
                }

                .info-item {
                    margin-bottom: 10px;

                    .info-image {
                        width: 10vw;
                        height: 10vw;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }

                    .info-title {
                        font-size: 13.5px;
                        font-weight: 600;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .info-read {
                        font-size: 10px;
                        margin-top: 5px;
                        color: #999;
                    }
                }
            }
        }
    }
</style>
