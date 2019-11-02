<template>
    <div id="user">
        <nav-bar v-if="navBarShow" left-arrow :title="this.$route.meta.title"
                 @click-left="routerGo" @click-right="clickRight">
            <span v-if="navBarRightShow" slot="right">{{navBarRightText}}</span>
        </nav-bar>
        <div class="user-view">
            <transition enter-active-class="animated slideInLeft faster">
                <router-view ref="user-view" @setNavBarShow="setNavBarShow" @setNavBarRight="setNavBarRight"/>
            </transition>
        </div>
    </div>
</template>

<script>
    import {NavBar} from 'vant'
    import animate from 'animate.css'

    export default {
        name: "User",
        components: {NavBar},
        data() {
            return {
                navBarShow: true,
                navBarRightShow: false,
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
        background-color: #f6f6f6;
        height: 100%;

        .user-view {
        }
    }
</style>
