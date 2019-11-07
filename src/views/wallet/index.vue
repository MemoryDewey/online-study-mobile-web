<template>
    <div id="wallet">
        <nav-bar left-arrow :title="this.$route.meta.title"  @click-left="routerGo"></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import {NavBar} from 'vant'

    export default {
        name: "Wallet",
        components: {NavBar},
        methods: {
            routerGo() {
                this.$router.go(-1);
            },
        },
        beforeCreate() {
            this.$emit('setTab', false);
        }
    }
</script>

<style lang="less">
    #wallet {
        background-color: #f2f2f6;
        height: 100%;
    }
</style>
