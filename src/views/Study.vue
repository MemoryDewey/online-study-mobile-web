<template>
    <div id="course-study">
        <nav-bar class="study-head-transparent" :title="headerShow?'课程详情':''"
                 ref="navBar" fixed :border="false" @click-left="routerGo" :z-index="100">
            <icon slot="left" name="arrow-left"></icon>
            <icon slot="right" :name="collection?'like':'like-o'" @click="collectCourse"></icon>
        </nav-bar>
        <div class="study-content">
            <course-video></course-video>
            <tabs v-model="activeTab" color="#1989fa" title-active-color="#1989fa" @scroll="scroll"
                  animated swipeable sticky>
                <tab title="详情">
                    <course-detail @setCourse="setCourse" :is-apply="isApply"></course-detail>
                </tab>
                <tab title="目录">
                    <course-chapter :live="live" :is-apply="isApply"></course-chapter>
                </tab>
                <tab title="评论">
                    <course-comment :rate="rate" :is-apply="isApply"></course-comment>
                </tab>
            </tabs>
            <div class="apply-btn">
                <van-button v-if="bstConfirmBtnShow" type="info" size="large" disabled
                            loading loading-text="账单确认中..."></van-button>
                <van-button v-else type="info" size="large" @click="applyCourse">{{bottomText}}</van-button>
            </div>
            <action-sheet v-model="buySheetShow" description="请选择支付方式" class="buy-sheet">
                <ul class="pay-type">
                    <li class="pay-type-item" @click="applyByBalance">
                        <svg-icon data="@icon/course-coin-square.svg" color="#1296db"></svg-icon>
                        <span>课程币</span>
                    </li>
                    <li class="pay-type-item" @click="applyByBst">
                        <svg-icon data="@icon/bst-coin-square.svg" color="#1afa29"></svg-icon>
                        <span>B S T</span>
                    </li>
                </ul>
                <div class="cancel-btn" @click="buySheetShow=false">取消</div>
            </action-sheet>
        </div>
    </div>
</template>

<script>
    import {NavBar, Icon, Tabs, Tab, Button, ActionSheet, Toast} from 'vant'
    import CourseVideo from '@/components/CourseVideo'
    import CourseDetail from '@/components/CourseDetail'
    import CourseChapter from '@/components/CourseChapter'
    import CourseComment from '@/components/CourseComment'
    import {
        checkApply, applyFree, collectCourse, applyCourseByBalance,
        checkBstStatue, applyChargeByBst, checkBstConfirmation
    } from '@/api/course'
    import socketClient from 'socket.io-client'
    import {getWebsocketUrl} from "@/utils/url";

    export default {
        name: "index",
        components: {
            CourseChapter, CourseDetail, CourseVideo, CourseComment,
            Icon, NavBar, Tabs, Tab, 'van-button': Button, ActionSheet,
        },
        data() {
            return {
                collection: false,
                live: true,
                free: true,
                bottomText: '',
                rate: 0,
                headerShow: false,
                isApply: false,
                isLogin: false,
                activeTab: 0,
                bstConfirmBtnShow: false,
                buySheetShow: false
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1);
            },
            setCourse(val) {
                this.live = val.live;
                this.rate = val.rate;
                this.collection = val.collection;
                this.free = val.price === 0;
                if (!this.isApply) this.bottomText = val.text;
                else this.bottomText = '开始上课';
            },
            scroll(val) {
                this.$nextTick(() => {
                    if (val.isFixed && !this.headerShow) {
                        this.$refs['navBar'].classList.replace('study-head-transparent', 'study-head-show');
                        this.headerShow = true;
                    } else if (!val.isFixed && this.headerShow) {
                        this.$refs['navBar'].classList.replace('study-head-show', 'study-head-transparent');
                        this.headerShow = false;
                    }
                });
            },
            async applyCourse() {
                if (!this.isLogin) await this.$router.push({name: 'login-phone', query: {origin: this.$route.path}});
                if (this.isApply) this.activeTab = 1;
                else if (this.free) {
                    const res = await applyFree({id: this.$route.params.id});
                    if (res) {
                        this.isApply = true;
                        this.bottomText = '开始上课'
                    }
                } else {
                    this.buySheetShow = true;
                }
            },
            async applyByBalance() {
                Toast.loading({
                    message: '支付中，请稍等...',
                    forbidClick: true,
                    loadingType: 'spinner'
                });
                const res = await applyCourseByBalance({id: this.$route.params.id});
                if (res) {
                    Toast.clear();
                    Toast.success(res.msg);
                    this.isApply = true;
                    this.buySheetShow = false;
                    this.bottomText = '开始上课'
                }
            },
            async applyByBst() {
                let res = await checkBstStatue({id: this.$route.params.id});
                if (res) {
                    Toast.loading({
                        message: '支付中，请稍等...',
                        forbidClick: true,
                        loadingType: 'spinner',
                        duration: 10000
                    });
                    await applyChargeByBst({id: this.$route.params.id});
                    const socketUrl = getWebsocketUrl();
                    const socket = socketClient.connect(socketUrl);
                    socket.emit('buyCourseByBst');
                    socket.on('message', data => {
                        Toast.clear();
                        if (data.status === 1) {
                            Toast.success(data.msg);
                            this.buySheetShow = false;
                            this.bstConfirmBtnShow = true;
                        } else Toast.fail('交易失败，请检查钱包ETH余额');
                    });
                    socket.on('buyCourseSuccess', data => {
                        Toast.success(data.msg);
                        this.isApply = true;
                        this.bstConfirmBtnShow = false;
                        this.bottomText = '开始上课'
                    });
                }
            },
            async collectCourse() {
                const value = this.collection ? 0 : 1;
                if (!localStorage.getItem('token')) Toast.fail('需要登录才能收藏该课程');
                else {
                    const res = await collectCourse({id: this.$route.params.id, value});
                    if (res) {
                        Toast.success(res.msg);
                        this.collection = !this.collection;
                    }
                }
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
        created() {
            checkApply({id: this.$route.params.id}).then(async res => {
                this.isApply = res['code'] === 1000;
                this.isLogin = res['code'] !== 401;
                if (res['code'] === 2000) {
                    res = await checkBstConfirmation({id: this.$route.params.id});
                    this.bstConfirmBtnShow = res['code'] === 1003;
                }
            });
        },
        beforeRouteLeave(to, from, next) {
            if (this.edit) {
                this.edit = false;
                next(false);
            } else next();
        }
    }
</script>

<style lang="less">
    #course-study {
        overflow: hidden;
        position: relative;

        .study-head-transparent {
            background: rgba(255, 255, 255, 0);

            .van-icon {
                color: #fff;
            }

            .van-icon-like {
                color: #1989fa;
            }
        }

        .study-head-show {
            background: rgba(255, 255, 255, 1);

            .van-icon {
                color: #1989fa;
            }
        }

        .study-content {
            height: calc(100vh - 50px);
            overflow-y: auto;
            position: relative;
        }

        .van-sticky--fixed {
            top: 45px;
        }

        .apply-btn {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 50px;
        }

        .bottom-btn-text {
            font-size: 16px;
            color: #fff;
        }

        .buy-sheet {
            .van-action-sheet__content {
                padding: 0 30px;
            }

            .van-action-sheet__description {
                color: #323233;
                font-size: 16px;
            }

            .pay-type {
                list-style: none;

                svg {
                    width: 24px;
                    height: 24px;
                }

                span {
                    margin-left: 10px;
                    font-size: 18px;
                }

                .pay-type-item {
                    margin-top: 20px;
                    list-style: none;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    -webkit-align-items: center;
                    font-size: 14px;

                    &:first-child {
                        margin-top: 0;
                    }
                }
            }

            .cancel-btn {
                width: 100%;
                padding: 8px 0;
                margin: 16px 0;
                border-radius: 999px;
                text-align: center;
                color: #fff;
                background-color: #909399;
                font-size: 14px;
            }
        }
    }
</style>
