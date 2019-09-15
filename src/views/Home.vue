<template>
    <div class="home">
        <div class="head-search">
            <search placeholder="请输入课程关键词"></search>
        </div>
        <main>
            <div class="banner">
                <swipe :autoplay="3000">
                    <swipe-item v-for="(image, index) in images" :key="index">
                        <img v-lazy="image" alt/>
                    </swipe-item>
                </swipe>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">精品课程</van-col>
                    <van-col span="12" class="tail">全部</van-col>
                </van-row>
                <course-card title="区块链入门课程" desc="对于区块链还不了解？赶快来报名区块链入门课程" price="311"
                             rate="98" sales="1234"
                             image="/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg"></course-card>
                <course-card title="区块链入门课程" desc="对于区块链还不了解？赶快来报名区块链入门课程" price="311"
                             rate="98" sales="1234"
                             image="/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg"></course-card>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">火热抢购</van-col>
                </van-row>
            </div>
            <div class="main-item">
                <van-row>
                    <van-col span="12" class="head">行业资讯</van-col>
                    <van-col span="12" class="tail">全部</van-col>
                </van-row>
            </div>
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </main>
    </div>
</template>

<script>
    import HelloWorld from "@/components/HelloWorld"
    import CourseCard from "@/components/CourseCard";
    import {NavBar, Swipe, SwipeItem, Search, Row, Col} from 'vant'
    import {getHomeCourse} from "@/api/home";

    export default {
        name: 'home',
        components: {
            HelloWorld, CourseCard, SwipeItem, Swipe, Search, NavBar,
            "van-row": Row, "van-col": Col
        },
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
            }
        },
        methods:{
            async getRecommendCourse(){
                const res = await getHomeCourse();
            }
        },
        created(){
            this.getRecommendCourse();
        }
    }
</script>

<style lang="less">
    @home-head-height: 54px;
    .home {
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
                padding: 1.2vh 3vw;
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
        }
    }
</style>
