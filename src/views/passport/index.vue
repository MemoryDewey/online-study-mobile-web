<template>
    <div id="passport">
        <nav-bar :title="title" left-arrow @click-left="routerGo"></nav-bar>
        <div class="logo-text" v-if="this.$route.name!=='short-message'">
            <van-row>
                <van-col span="7"></van-col>
                <van-col span="10">
                    <div class="logo">
                        <img src="../../assets/image/logo-bcs.png" alt>
                    </div>
                </van-col>
                <van-col span="7"></van-col>
            </van-row>
        </div>
        <router-view @setTitle="setTitle"/>
    </div>
</template>

<script>
    import {NavBar, Row, Col} from 'vant'

    export default {
        name: "index",
        data() {
            return {
                title: null,
            }
        },
        components: {NavBar, "van-row": Row, "van-col": Col},
        beforeCreate() {
            this.$emit('setTab', false);
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
