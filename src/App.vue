<template>
    <div id="app">
        <router-view/>
        <tabbar v-model="active" route>
            <tabbar-item replace name="index" icon="home-o" to="/">首页</tabbar-item>
            <tabbar-item replace name="course" icon="search" to="/course">课程</tabbar-item>
            <tabbar-item name="user" icon="user-o">我的</tabbar-item>
        </tabbar>
    </div>

</template>

<script>
    import {Tabbar, TabbarItem} from 'vant';

    export default {
        data() {
            return {
                active: 'index'
            }
        },
        components: {
            Tabbar, TabbarItem
        },
        created() {

        }
    }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
