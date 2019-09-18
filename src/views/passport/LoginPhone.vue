<template>
    <div class="login-form">
        <van-input v-model="phone" placeholder="请输入手机号" maxlength="11" :border="false"></van-input>
        <div style="padding: 10px 16px">
            <van-button type="info" size="large" :disabled="!phoneCheck">获取验证码</van-button>
        </div>
        <div class="login-text" style="text-align: center">
            <router-link tag="span" to="/passport/login-account">账号密码登录</router-link>
        </div>
    </div>
</template>

<script>
    import {Field, Button, CountDown} from 'vant'

    export default {
        name: "LoginPhone",
        components: {
            "van-input": Field, "van-button": Button, CountDown
        },
        data() {
            return {
                phone: ''
            }
        },
        computed:{
            phoneCheck() {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                return this.phone.match(regPhone);
            }
        },
        beforeCreate() {
            this.$emit('setTitle', '短信验证码登录');
        },
    }
</script>

