<template>
    <div id="app">
        <router-view  @setTab="setTab"/>
        <tabbar v-if="tabBarShow" v-model="active" route>
            <tabbar-item replace name="index" icon="home-o" to="/">首页</tabbar-item>
            <tabbar-item replace name="course" icon="search" to="/course">课程</tabbar-item>
            <tabbar-item name="user" icon="user-o" to="/profile">我的</tabbar-item>
        </tabbar>
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
        methods:{
          setTab(data){
              this.tabBarShow = data;
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
    @import "assets/css/passport";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
        position: fixed;
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
