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
        }
    }
</style>
