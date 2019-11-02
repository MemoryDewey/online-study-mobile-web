<template>
    <div class="comment-list">
        <div class="comment-list-head">
            <div class="total">好评度 {{this.$route.params.rate*100}}%</div>
            <van-row>
                <van-col :span="6">
                    <van-button round size="small" plain @click="commentChange(0)"
                                type="info" block>全部 ( {{commentCount.all|countFilter}} )
                    </van-button>
                </van-col>
                <van-col :span="6">
                    <van-button round size="small" plain @click="commentChange(1)"
                                type="info" block>好评 ( {{commentCount.good|countFilter}} )
                    </van-button>
                </van-col>
                <van-col :span="6">
                    <van-button round size="small" plain @click="commentChange(2)"
                                type="info" block>中评 ( {{commentCount.mid|countFilter}} )
                    </van-button>
                </van-col>
                <van-col :span="6">
                    <van-button round size="small" plain @click="commentChange(3)"
                                type="info" block>差评（{{commentCount.bad|countFilter}}）
                    </van-button>
                </van-col>
            </van-row>
        </div>
        <div class="comment-list-content">
            <van-list v-model="loading" finished-text="已经到底啦" :immediate-check="false"
                      :finished="finished" @load="listOnload">
                <comment-card v-for="comment in commentList" :key="comment.id"
                              :avatar="comment['UserInformation'].avatarUrl"
                              :nickname="comment['UserInformation'].nickname"
                              :rate="comment.star" :content="comment.content"
                              :time="comment.time"></comment-card>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {List, Row, Col, Button} from 'vant'
    import {getCommentCount, getComment} from '@/api/course'
    import CommentCard from '@/components/CommentCard'

    export default {
        name: "CommentList",
        components: {
            'van-list': List, 'van-row': Row, 'van-col': Col, 'van-button': Button,
            CommentCard
        },
        filters: {
            countFilter(count) {
                return count > 99 ? "99+" : count
            }
        },
        data() {
            return {
                commentCount: {all: 0, good: 0, mid: 0, bad: 0},
                commentList: [],
                loading: false,
                page: 0,
                filter: 0,
                loadingTimes: 1,
                finished: false
            }
        },
        methods: {
            async getComment(filter, page) {
                const res = await getComment({courseID: this.$route.params.id, filter, page});
                if (res) {
                    this.loading = false;
                    for (let comment of res.comments) {
                        this.commentList.push(comment);
                    }
                    this.loadingTimes++;
                }
            },
            listOnload() {
                setTimeout(() => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        this.getComment(this.filter, this.loadingTimes);
                    }
                }, 500);
            },
            async commentChange(filter) {
                this.filter = filter;
                this.commentList = [];
                this.loading = false;
                this.loadingTimes = 1;
                if (!this.finished) {
                    this.listOnload();
                } else this.finished = false;
            }
        },
        beforeCreate() {
            this.$emit('changeTitle', this.$route.meta.title);
        },
        created() {
            getCommentCount({courseID: this.$route.params.id}).then(res => {
                if (res) {
                    this.commentCount = res.count;
                    this.page = res.count.all % 5 === 0 ?
                        Math.floor(res.count.all / 5) : Math.floor(res.count.all / 5) + 1;
                }
            });
            this.listOnload();
        }
    }
</script>

<style lang="less">
    .comment-list {
        height: 100%;

        .comment-list-head {
            height: 75px;
            padding: 10px;

            .total {
                height: 50%;
                font-size: 15px;
                line-height: 20px;
                text-align: left;
                color: #1989fa;
            }

            .van-col {
                padding: 0 3px;
            }

            button {
                padding: 0 5px;
            }
        }

        .comment-list-content {
            height: calc(100vh - 141px);
            margin-top: 10px;
            position: relative;
            overflow: auto;
        }
    }
</style>
