<template>
    <div class="course-study-comment">
        <div class="comment-head">
            <div class="score">{{rate===1?10:(rate*10).toFixed(1)}}</div>
            <div class="rating">
                <div class="rate-star">
                    <div class="star-gray">
                        <i class="star">
                            <svg-icon data="@icon/star.svg" color="#ddd"></svg-icon>
                        </i>
                        <i class="star">
                            <svg-icon data="@icon/star.svg" color="#ddd"></svg-icon>
                        </i>
                        <i class="star">
                            <svg-icon data="@icon/star.svg" color="#ddd"></svg-icon>
                        </i>
                        <i class="star">
                            <svg-icon data="@icon/star.svg" color="#ddd"></svg-icon>
                        </i>
                        <i class="star">
                            <svg-icon data="@icon/star.svg" color="#ddd"></svg-icon>
                        </i>
                    </div>
                    <div class="star-gold">
                        <i class="star" v-for="star in rateStars" :style="star">
                            <svg-icon data="@icon/star.svg" color="#ffae05"></svg-icon>
                        </i>
                    </div>
                </div>
                <div><span>共{{count}}条评价</span></div>
            </div>
            <van-button type="info" size="small" :disabled="!isApply"
                        :to="{name:'course-comment-commit',params:{id:this.$route.params.id}}">评价课程
            </van-button>
        </div>
        <div class="comment-body">
            <template v-if="count>0">
                <comment-card v-for="comment in comments" :key="comment.id"
                              :avatar="comment.avatar"
                              :nickname="comment.user"
                              :rate="comment.star" :content="comment.content"
                              :time="comment.time">
                </comment-card>
                <skeleton :loading="loading" title avatar :row="3"></skeleton>
                <skeleton :loading="loading" title avatar :row="3"></skeleton>
                <skeleton :loading="loading" title avatar :row="3"></skeleton>
                <div class="comment-bottom">
                    <router-link tag="span" :to="{name:'course-comment-list',params:{id:this.$route.params.id,rate}}">
                        查看全部
                    </router-link>
                </div>
            </template>
            <template v-else>
                <div class="no-comment"><span>该课程暂无评价</span></div>
            </template>
        </div>
    </div>
</template>

<script>
    import {Button, Rate, Skeleton, Notify} from 'vant'
    import CommentCard from '@/components/CommentCard'
    import {getComment, getCommentCount} from '@/api/course'

    export default {
        name: "CourseComment",
        components: {'van-button': Button, Rate, Skeleton, CommentCard},
        props: {
            rate: {type: Number, required: true},
            isApply: {type: Boolean, required: true}
        },
        data() {
            return {
                rateStars: [],
                count: 0,
                loading: true,
                comments: [],
                commentDialogShow: false,
            }
        },
        methods: {
            setRateStars() {
                this.rateStars = [];
                let sumWidth = this.rate * 100;
                let clientWidth = 20 / 37.5;
                for (let i = sumWidth; i > 0; i -= 20) {
                    if (i < 20) {
                        const realWidth = i / 20 * clientWidth;
                        this.rateStars.push({
                            width: `${realWidth}rem`
                        });
                    } else {
                        this.rateStars.push({});
                    }
                }
            },
            async getComment() {
                let res = await getCommentCount({id: this.$route.params.id});
                if (res) this.count = res.count.all;
                res = await getComment({
                    id: this.$route.params.id,
                    filter: 0, page: 1
                });
                if (res) {
                    this.loading = false;
                    this.comments = res.comments;
                }
            }
        },
        created() {
            this.$nextTick(() => {
                this.setRateStars();
            });
            this.getComment();
        }
    }
</script>

<style lang="less">
    .course-study-comment {
        .comment-head {
            height: 50px;
            padding: 5px 16px;
            border-bottom: 1px solid #ebedf0;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;

            .score {
                font-size: 40px;
                color: #ffae05;
                padding: 0 20px;
            }

            .rating {
                width: 125px;
                padding: 0 20px;

                svg {
                    width: 20px;
                }

                span {
                    font-size: 14px;
                }

                .rate-star {
                    height: 23px;
                    display: inline-block;
                    position: relative;
                }

                .star {
                    font-size: 20px;
                    display: inline-block;
                    margin-right: 5px;
                    overflow: hidden;
                }

                .star-gray {
                    z-index: 1;
                    position: relative;
                    overflow: hidden;
                }

                .star-gold {
                    z-index: 2;
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                }
            }
        }

        .comment-body {
            padding: 0 16px 10px;

            .no-comment, .comment-bottom {
                width: 100%;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                margin-top: 10px;

                span {
                    font-size: 18px;
                    color: #7d7e80;
                }
            }

            .dialog-rate-title {
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
            }
        }
    }
</style>
