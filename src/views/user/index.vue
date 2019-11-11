<template>
    <div id="user">
        <nav-bar v-if="navBarShow" left-arrow :title="this.$route.meta.title"
                 @click-left="routerGo" @click-right="clickRight">
            <template v-if="navBarRightShow" slot="right">
                <icon v-if="navBarRightIcon" :name="navBarRightIcon"></icon>
                <span v-else>{{navBarRightText}}</span>
            </template>
        </nav-bar>
        <div class="user-view">
            <transition enter-active-class="animated slideInLeft faster">
                <router-view ref="user-view" @setNavBarShow="setNavBarShow" @setNavBarRight="setNavBarRight"/>
            </transition>
        </div>
    </div>
</template>

<script>
    import {NavBar, Icon} from 'vant'
    import animate from 'animate.css'

    export default {
        name: "User",
        components: {NavBar, Icon},
        data() {
            return {
                navBarShow: true,
                navBarRightShow: false,
                navBarRightIcon: false,
                navBarRightText: null,
                navBarRightFuncName: ''
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1);
            },
            setNavBarShow(show) {
                this.navBarShow = show;
            },
            setNavBarRight(val) {
                this.navBarRightShow = val.show;
                this.navBarRightText = val.text;
                this.navBarRightIcon = val.icon;
                this.navBarRightFuncName = val.funcName;
            },
            clickRight() {
                this.$nextTick(() => {
                    this.$refs['user-view'][this.navBarRightFuncName]();
                });
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        }
    }
</script>

<style lang="less">
    #user {
        background-color: #f2f2f6;
        height: 100%;

        .van-nav-bar__right i{
            font-size: 18px;
        }

        .user-view {
            .course-manage {
                ul, li {
                    list-style: none;
                }

                h2, h3, p {
                    margin: 0;
                    padding: 0;
                    font-weight: 400;
                }

                .tab-list-item {
                    padding: 12px 16px 0;
                    background-color: #fff;
                    margin-bottom: 10px;
                    position: relative;
                }

                .tab-item-status {
                    position: absolute;
                    right: 16px;
                    top: 14px;
                    font-size: 12px;
                    color: #1989fa;
                }

                .tab-item-time {
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                }

                .tab-time {
                    font-size: 14px;
                    max-width: 182px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .tab-item-content {
                    margin-top: 12px;
                    padding-bottom: 16px;
                    display: flex;
                    display: -webkit-flex;
                    position: relative;
                    border-bottom: 1px solid rgba(221, 221, 221, 60%);
                }

                .tab-item-main {
                    margin-left: 8px;
                    flex: 1;
                    -webkit-flex: 1;
                }

                .tab-item-cover {
                    width: 110px;
                    height: 62px;
                    position: relative;
                    background-size: cover;
                }

                .tab-item-title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    line-height: 1.5;
                    height: 40px;
                    word-break: break-all;
                }

                .tab-item-price {
                    margin-top: 4px;
                    font-size: 14px;
                    color: #ee0a24;
                }

                .free {
                    color: #42c02e;
                }

                .tab-item-btn {
                    display: flex;
                    display: -webkit-flex;
                    height: 44px;
                    align-items: center;
                    flex-direction: row-reverse;
                    -webkit-flex-direction: row-reverse;
                    -webkit-align-items: center;

                    button {
                        padding: 0 13px;

                        &:nth-child(2) {
                            margin-right: 10px;
                        }
                    }
                }

                .tab-item-bottom {
                    height: 44px;
                    padding-top: 8px;
                    font-size: 14px;
                    word-wrap: break-word;
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
