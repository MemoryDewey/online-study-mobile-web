<template>
    <div class="login-form">
        <van-input v-model="account" placeholder="请输入手机号/邮箱" :border="false" clearable></van-input>
        <van-input v-model="password" placeholder="请输入登录密码" :border="false" type="password" clearable></van-input>
        <div class="login-text" style="text-align: right">
            <router-link tag="span" :to="{name:'reset-password'}">忘记密码</router-link>
        </div>
        <div class="passport-btn">
            <van-button type="info" size="large" @click="login" :disabled="!account || !password">登录</van-button>
        </div>
        <div class="login-text" style="text-align: center">
            <router-link tag="span" to="/passport/login-phone">短信验证码登录</router-link>
        </div>
    </div>
</template>

<script>
    import {Field, Button} from 'vant'
    import {loginByPsw} from "@/api/passport";

    export default {
        name: "LoginAccount",
        components: {
            "van-input": Field,
            "van-button": Button
        },
        data() {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            async login() {
                const res = await loginByPsw({account: this.account, password: this.password});
                if (res) {
                    localStorage.setItem('token', res.token);
                    await this.$router.push('/profile');
                }
            }
        },
        beforeCreate() {
            this.$emit('setTitle', this.$route.meta.title);
        }
    }
</script>
