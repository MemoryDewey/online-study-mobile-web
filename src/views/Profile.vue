<template>
    <div id="profile">
        <section id="header">
            <cell-group :border="false">
                <cell :to="isLogin?'':{name:'login-phone'}">
                    <van-row style="padding: 1vh 0">
                        <van-col :span="6">
                            <div class="avatar" :class="{'not-login':!isLogin}">
                                <icon v-if="!isLogin" name="manager" size="8vw"></icon>
                                <img v-else :src="userInfo.avatarUrl" alt>
                            </div>
                        </van-col>
                        <van-col :span="12">
                            <div class="info">
                                <h2 class="van-ellipsis">{{!isLogin?'未登录':userInfo.nickname}}</h2>
                            </div>
                        </van-col>
                    </van-row>
                </cell>
                <cell>
                    <grid :column-num="3" :border="false">
                        <grid-item icon="orders-o" text="课程管理"></grid-item>
                        <grid-item icon="balance-pay" text="我的钱包"></grid-item>
                        <grid-item icon="like-o" text="收藏"></grid-item>
                    </grid>
                </cell>
            </cell-group>
        </section>
        <section>
            <cell title="最近在学" is-link :border="false"
                  :style="{paddingBottom:isLogin?'0':'10px'}"></cell>
            <row-list :list-data="course" class="nearly-study" v-if="isLogin">
                <template v-slot:item="{item}">
                    <div class="study-item">
                        <div class="study-image">
                            <img v-lazy="item.image" alt>
                        </div>
                        <div class="study-content">{{item.title}}</div>
                    </div>
                </template>
            </row-list>
        </section>
        <section>
            <cell-group :border="false">
                <cell title="已购课程" is-link></cell>
                <cell title="我的考试" is-link></cell>
                <cell title="我的证书" is-link></cell>
            </cell-group>
        </section>
        <section>
            <cell title="余额" is-link>
                <template slot>
                    <icon name="gold-coin" style="line-height: inherit;vertical-align: middle"/>
                    <span style="vertical-align: middle;margin-left: 1vw">0.00</span>
                </template>
            </cell>
        </section>
        <section>
            <cell title="账号管理" clickable>
                <icon slot="right-icon" name="setting-o" style="line-height: inherit;"></icon>
            </cell>
        </section>
    </div>
</template>

<script>
    import {CellGroup, Icon, Cell, Row, Col, Grid, GridItem} from 'vant'
    import RowList from "@/components/RowList";
    import {checkLogin} from "@/api/passport";

    export default {
        name: "Profile",
        components: {
            Cell, Icon, CellGroup, "van-row": Row, "van-col": Col, Grid, GridItem,
            RowList
        },
        data() {
            return {
                isLogin: false,
                userInfo: {
                    avatarUrl: '',
                    nickname: '',
                },
                course: [{
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下下下下下'
                }, {
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下'
                }, {
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下'
                }, {
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下'
                }, {
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下'
                }, {
                    image: '/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg',
                    title: '你最近学了啥课程呀，分享一下'
                }]
            }
        },
        beforeCreate() {
            this.$emit('setTab', true);
        },
        created() {
            if (!this.$store.state.loginState) {
                checkLogin().then(res => {
                    if (res.status === 1) {
                        this.isLogin = true;
                        this.userInfo = res.data;
                        this.$store.commit('login', res.data);
                    }
                });
            } else {
                this.isLogin = true;
                this.userInfo = this.$store.state.userInfo;
                console.log(this.userInfo);
            }
        }
    }
</script>

<style lang="less">
    #profile {
        height: calc(100vh - 50px);
        background-color: #f6f6f6;

        section {
            margin-bottom: 1vh;

            .van-cell, .van-cell__right-icon {
                font-size: 2vh;
                line-height: 3vh;
            }

            .van-grid-item__icon {
                font-size: 3.81vh;
            }

            .van-grid-item__text {
                font-size: 1.64vh;
            }
        }

        .avatar {
            width: 12.5vw;
            height: 12.5vw;
            box-sizing: border-box;

            .not-login {
                background-color: #f6f6f6;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                border-radius: 50%;
                border: 1px solid #f6f6f6;

                i {
                    margin: auto;
                }
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        #header .van-cell:not(:last-child)::after {
            left: 0;
        }

        .van-grid-item__content {
            padding: 0 8px;
        }

        .info {
            height: 12.5vw;
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

            .study-item {
                height: 9vh;
                overflow: hidden;
                padding-bottom: 10px;

                .study-image {
                    width: calc(6vh * 16 / 9);

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .study-content {
                    width: calc(6vh * 16 / 9);
                    font-size: 1.2vh;
                    white-space: normal;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            }
        }
    }
</style>
