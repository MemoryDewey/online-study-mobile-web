<template>
    <div id="app">
        <transition name="van-fade">
            <router-view @setTab="setTab"/>
        </transition>
        <keep-alive>
            <tabbar v-if="tabBarShow" v-model="active" route safe-area-inset-bottom>
                <tabbar-item replace name="index" icon="wap-home-o" to="/">首页</tabbar-item>
                <tabbar-item replace name="course" icon="search" to="/course">课程</tabbar-item>
                <tabbar-item replace name="user" icon="user-o" to="/profile">我的</tabbar-item>
            </tabbar>
        </keep-alive>
    </div>

</template>

<script>
    import {Tabbar, TabbarItem} from 'vant';

    export default {
        data() {
            return {
                tabBarShow: false,
                active: 'index'
            }
        },
        methods: {
            setTab(data) {
                this.tabBarShow = data;
            }
        },
        components: {
            Tabbar, TabbarItem
        },
        mounted() {
            document.addEventListener("deviceready", onDeviceReady, false);
            let _this = this;

            function onDeviceReady() {
                _this.msg = "cordove device ready.";
            }
        },
    }
</script>

<style lang="less">
    @import "assets/css/passport";

    #app {
        font-family: PingFang SC, 'Helvetica Neue', Helvetica, 'Avenir', Microsoft YaHei, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
        position: fixed;

        .list-no-data {
            margin-top: 10px;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            flex-direction: column;

            .no-data-icon {
                width: 100px;
                height: 100px;
            }

            .no-data-text {
                color: #999;
                margin-top: 10px;
                font-size: 18px;
            }
        }
    }
</style>
