<template>
    <div class="commit-comment">
        <divider>您的评价</divider>
        <div class="comment-body">
            <rate v-model="rate" color="#ffae05"></rate>
            <div class="rate-intro" :style="{color:getRateTextColor}">{{rate | filterRateText}}</div>
            <div class="van-cell van-field">
                <div class="van-cell__value van-cell__value--alone">
                    <div class="van-field__body">
                        <label style="width: 100%">
                            <textarea v-model="comment" rows="8" minlength="15" maxlength="1000"
                                      placeholder="课程怎么样？快来说说学习感受吧"
                                      class="van-field__control"></textarea>
                        </label>
                    </div>
                    <div class="van-field__error-message van-field__error-message--right">
                        <span :style="{color:getCommentLenColor}">{{comment.length}}</span>
                        <span style="color: #969799">&nbsp;/ 1000</span>
                    </div>
                </div>
            </div>
        </div>
        <tabbar fixed v-if="tabShow">
            <tabbar-item style="background-color: #1989fa" @click="commitComment">
                <span class="bottom-btn-text">提交</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {Rate, Button, Divider, Tabbar, TabbarItem, Toast} from 'vant'
    import {addComment} from '@/api/course'

    export default {
        name: "CommitComment",
        components: {
            Rate, Divider, 'van-button': Button, TabbarItem, Tabbar
        },
        filters: {
            filterRateText(rate) {
                const rateMap = {
                    1: '非常不满意',
                    2: '不满意',
                    3: '一般',
                    4: '满意',
                    5: '非常满意'
                };
                return rateMap[rate];
            }
        },
        data() {
            return {
                rate: 5,
                tabShow: true,
                fixedHeight: 0,
                comment: ''
            }
        },
        computed: {
            getRateTextColor() {
                const rateColor = {
                    worse: '#2c3e50',
                    better: '#ffae05'
                };
                if (this.rate < 3) return rateColor.worse;
                else return rateColor.better;
            },
            getCommentLenColor() {
                return (this.comment.length >= 15 && this.comment.length <= 1000) ? '#969799' : '#ee0a24';
            }
        },
        methods: {
            async commitComment() {
                if (this.comment.length < 15 || this.comment.length > 1000) {
                    Toast.fail('评论长度需在15到1000字');
                } else {
                    const res = await addComment({
                        courseID: this.$route.params.id,
                        star: this.rate,
                        comment: this.comment
                    });
                    if (res) {
                        Toast.success(res.msg);
                        this.$router.go(-1);
                    }
                }
            }
        },
        beforeCreate() {
            this.$emit('changeTitle', this.$route.meta.title);
        },
        created() {
            this.fixedHeight = window.innerHeight;
            window.onresize = () => {
                this.tabShow = window.innerHeight >= this.fixedHeight;
            };
        }
    }
</script>

<style lang="less">
    .commit-comment {
        padding: 10px 16px;

        .comment-body {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            flex-direction: column;
        }

        .rate-intro {
            margin-top: 5px;
            font-size: 14px;
        }

        .van-rate {
            i {
                font-size: 30px
            }
        }

        .van-field {
            margin-top: 10px;
            border: 1px solid #ebedf0;
        }

        .bottom-btn-text {
            font-size: 16px;
            color: #fff;
        }
    }
</style>
