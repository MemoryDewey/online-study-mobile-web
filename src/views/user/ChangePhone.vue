<template>
    <div id="user-change-phone">
        <nav-bar left-arrow :title="this.$route.meta.title" @click-left="routerGo"></nav-bar>
        <section>
            <div class="safety-top">
                <svg-icon class="safety-icon" data="@icon/safety-setting.svg" color="#1296db"></svg-icon>
                <div class="safety-text">
                    <span>为了您的账户安全，需要验证您的手机</span>
                </div>
                <div class="safety-text">
                    <span>183****5596</span>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import {NavBar, Field, Button, CountDown, Toast} from 'vant'
    export default {
        name: "ChangePhone",
        components: {NavBar, 'van-input': Field, 'van-button': Button, CountDown},
        methods: {
            routerGo() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="less">
    #user-change-phone{
        section {
            margin-top: 20px;
            .safety-top{
                display: flex;
                align-items: center;
                flex-direction: column;
                .safety-icon{
                    width: 80px;
                    height: 80px;
                }
                .safety-text{
                    margin-top: 10px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
