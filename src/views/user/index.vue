<template>
    <div id="user">
        <nav-bar :title="title" left-arrow @click-left="routerGo"></nav-bar>
        <div class="user-view">
            <router-view @setTitle="setTitle"/>
        </div>
    </div>
</template>

<script>
    import {NavBar} from 'vant'

    export default {
        name: "index",
        data() {
            return {
                title: null,
            }
        },
        components: {NavBar},
        beforeCreate() {
            this.$emit('setTab', false);
            console.log(window.innerHeight);
            console.log(process.env.NODE_ENV);
        },
        methods: {
            setTitle(title) {
                this.title = title;
            },
            routerGo() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less">
    #user {
        background-color: #f6f6f6;
        height: 100%;
        .user-view{
        }
    }
</style>
