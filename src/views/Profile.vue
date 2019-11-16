<template>
    <div id="profile">
        <section id="header">
            <cell-group :border="false">
                <cell :to="isLogin?{name:'user-information'}:{name:'login-phone'}">
                    <van-row class="avatar-info">
                        <van-col :span="6">
                            <div class="avatar" :class="{'not-login':!isLogin}">
                                <icon v-if="!isLogin" name="manager" size="30px"></icon>
                                <img v-else :src="getImageUrl(userInfo.avatarUrl)" alt>
                            </div>
                        </van-col>
                        <van-col :span="12">
                            <div class="info">
                                <h2 class="van-ellipsis">{{!isLogin?'未登录':userInfo.nickname}}</h2>
                            </div>
                        </van-col>
                    </van-row>
                </cell>
                <cell class="header-second">
                    <grid :column-num="3" :border="false" clickable>
                        <grid-item icon="orders-o" text="课程管理" :to="{name:'user-course-manage'}"></grid-item>
                        <grid-item icon="paid" text="我的钱包" :to="{name:'wallet-info'}"></grid-item>
                        <grid-item icon="like-o" text="收藏" :to="{name:'user-collection'}"></grid-item>
                    </grid>
                </cell>
            </cell-group>
        </section>
        <section>
            <cell title="最近在学" :border="false">
                <svg-icon slot="icon" data="@icon/history.svg" class="cell-svg-left-icon"
                          color="#3f98eb"></svg-icon>
            </cell>
            <row-list :list-data="courses" class="nearly-study" v-if="isLogin && courses.length>0">
                <template v-slot:item="{item}">
                    <div class="study-item" @click="routerGO(item['courseID'])">
                        <div class="study-image">
                            <img v-lazy="getImageUrl(item['CourseInformation']['courseImage'])" alt>
                        </div>
                        <div class="study-content">{{item['CourseInformation']['courseName']}}</div>
                    </div>
                </template>
            </row-list>
        </section>
        <section>
            <cell-group :border="false">
                <cell title="我的考试" is-link :to="{name:'user-exam'}">
                    <svg-icon slot="icon" data="@icon/paper.svg" class="cell-svg-left-icon"
                              color="#ff2121"></svg-icon>
                </cell>
                <cell title="我的证书" is-link>
                    <svg-icon slot="icon" data="@icon/certificate.svg" class="cell-svg-left-icon"
                              color="#ffdf0c"></svg-icon>
                </cell>
            </cell-group>
        </section>
        <section>
            <cell title="账户余额" is-link :to="{name:'user-balance'}">
                <svg-icon slot="icon" data="@icon/coin.svg" class="cell-svg-left-icon" color="#ffdf0c"></svg-icon>
                <span style="vertical-align: middle;margin-left: 1vw">{{balance}}</span>
            </cell>
        </section>
        <section>
            <cell-group :border="false">
                <cell title="邀请好友" clickable :to="{name:'user-invite'}" is-link>
                    <svg-icon slot="icon" data="@icon/invite.svg" class="cell-svg-left-icon" color="#00f6d0"></svg-icon>
                </cell>
                <cell title="反馈建议" clickable is-link :to="{name:'user-feedback'}">
                    <svg-icon slot="icon" data="@icon/feedback.svg" class="cell-svg-left-icon"
                              color="#3f98eb"></svg-icon>
                </cell>
            </cell-group>
        </section>
    </div>
</template>

<script>
    import {CellGroup, Icon, Cell, Row, Col, Grid, GridItem} from 'vant'
    import RowList from "@/components/RowList"
    import {checkLogin} from "@/api/passport"
    import {getImageUrl} from '@/utils/url'
    import {getLatestBrowseCourse} from "@/api/profile"
    import {getWalletInfo} from "@/api/wallet"

    export default {
        name: "Profile",
        components: {Cell, Icon, CellGroup, "van-row": Row, "van-col": Col, Grid, GridItem, RowList},
        data() {
            return {
                isLogin: false,
                userInfo: {
                    avatarUrl: '',
                    nickname: '',
                },
                getImageUrl,
                courses: [],
                balance: 0
            }
        },
        methods: {
            routerGO(courseID) {
                this.$router.push({name: 'course-study', params: {id: courseID}})
            }
        },
        beforeCreate() {
            this.$emit('setTab', true);
        },
        created() {
            if (!this.$store.state.loginState) {
                checkLogin().then(res => {
                    if (res) {
                        this.isLogin = true;
                        this.userInfo = res.data;
                        this.$store.commit('login', res.data);
                        getLatestBrowseCourse().then(res => {
                            this.courses = res['course'];
                        });
                        getWalletInfo().then(res => {
                            if (res) this.balance = parseFloat(res['wallet'].balance).toFixed(2);
                        });
                    }
                });
            } else {
                this.isLogin = true;
                this.userInfo = this.$store.state.userInfo;
                getLatestBrowseCourse().then(res => {
                    this.courses = res['course'];
                });
                getWalletInfo().then(res => {
                    if (res) this.balance = parseFloat(res['wallet'].balance).toFixed(2);
                });
            }
        }
    }
</script>

<style lang="less">
    #profile {
        height: 100%;
        background-color: #f2f2f6;

        section {
            margin-bottom: 12px;
        }

        .avatar-info {
            padding: 7px 0;
        }

        .avatar {
            width: 56px;
            height: 56px;
            box-sizing: border-box;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .not-login {
            background-color: #f2f2f6;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            border-radius: 50%;
            border: 1px solid #f6f6f6;

            i {
                margin: auto;
            }
        }

        #header {
            .van-cell:not(:last-child)::after {
                left: 0;
            }

            .header-second {
                padding: 0;
            }
        }

        .info {
            height: 56px;
            display: table-cell;
            vertical-align: middle;

            h2 {
                font-weight: 500;
                vertical-align: middle;
                margin: 0;
            }
        }

        .nearly-study {
            background-color: #fff;
            padding: 0 16px;
            margin-top: -5px;
            height: 92px;

            .row-list {
                padding: 5px 0 10px;
            }

            .study-item {
                height: 80px;
                overflow: hidden;

                .study-image {
                    width: 85px;
                    height: 46px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .study-content {
                    width: 85px;
                    font-size: 10px;
                    white-space: normal;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            }
        }

        .cell-svg-left-icon {
            width: 16px;
            height: 24px;
            margin-right: 10px;
            vertical-align: middle;
        }
    }
</style>
