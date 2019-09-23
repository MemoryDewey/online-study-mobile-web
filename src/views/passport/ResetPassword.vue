<template>
    <div class="login-form">
        <van-input v-model="phone" placeholder="请输入手机号" :border="false" clearable></van-input>
        <van-input v-model="password" placeholder="请输入密码(8-16位)" :border="false" type="password" clearable></van-input>
        <van-input v-model="confirm" placeholder="确认密码" :border="false" type="password" clearable></van-input>
        <div style="padding: 10px 16px">
            <van-button type="info" size="large" @click="getShortMessageCode" :disabled="!passwordCheck || !phoneCheck">
                重置
            </van-button>
        </div>
        <div class="login-text" style="text-align: center">
            <router-link tag="span" to="/passport/login-phone">返回登录</router-link>
        </div>
    </div>
</template>

<script>
    import {Field, Button} from 'vant'
    import {sendMessage} from "@/api/passport";

    export default {
        name: "ResetPassword",
        components: {
            "van-input": Field,
            "van-button": Button
        },
        data() {
            return {
                phone: '',
                confirm: '',
                password: ''
            }
        },
        methods: {
            async getShortMessageCode() {
                const res = await sendMessage({account: this.phone, option: 'reset'});
                if (res){
                    await this.$router.push({
                        name: 'short-message',
                        query: {phone: this.phone, option: 'reset'},
                    });
                    localStorage.setItem('psw',this.password);
                }
            }
        },
        computed: {
            phoneCheck() {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                return this.phone.match(regPhone);
            },
            passwordCheck() {
                if (this.confirm !== this.password) return false;
                const regPassword = /^[\w!#$%&'*+/=?^_`{|}~,.;":]{8,16}$/;
                return this.password.match(regPassword);
            }
        },
        beforeCreate() {
            this.$emit('setTitle', this.$route.meta.title);
        },
    }
</script>
