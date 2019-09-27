<template>
    <div class="login-form">
        <van-input v-model="phone" placeholder="请输入手机号" maxlength="11" :border="false" clearable></van-input>
        <div class="passport-btn">
            <van-button type="info" size="large" :disabled="!phoneCheck" @click="getShortMessageCode">获取验证码</van-button>
        </div>
        <div class="login-text" style="text-align: center">
            <router-link tag="span" :to="{name:'login-account',query: this.$route.query}">账号密码登录</router-link>
        </div>
    </div>
</template>

<script>
    import {Field, Button} from 'vant'
    import {sendMessage} from "@/api/passport";

    export default {
        name: "LoginPhone",
        components: {
            "van-input": Field, "van-button": Button
        },
        data() {
            return {
                phone: ''
            }
        },
        computed: {
            phoneCheck() {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                return this.phone.match(regPhone);
            }
        },
        methods: {
            async getShortMessageCode() {
                const res = await sendMessage({account: this.phone, option: 'login'});
                if (res)
                    await this.$router.push({
                        name: 'short-message', query: {
                            phone: this.phone, option: 'login', origin: this.$route.query.origin
                        }
                    })
            }
        },
        beforeCreate() {
            this.$emit('setTitle', this.$route.meta.title);
        },
    }
</script>

