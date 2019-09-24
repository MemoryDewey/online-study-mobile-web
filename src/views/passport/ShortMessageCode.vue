<template>
    <div class="no-logo-login-form">
        <h2>输入短信验证码</h2>
        <span class="message-info">短信验证码已发送至 {{formatPhone}}</span>
        <code-input v-model="verifyCode" :mask="false" :focused="showKeyboard"
                    @focus="showKeyboard = true"></code-input>
        <number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"
                         @blur="showKeyboard = false" safe-area-inset-bottom></number-keyboard>
        <div class="message-info" style="color: #409eff">
            <count-down v-if="!canResend" ref="countDown" :time="1000*90"
                        format="ss秒后重新发送" @finish="canResend = true"></count-down>
            <span v-else @click="resend">重新发送</span>
        </div>
    </div>
</template>

<script>
    import {PasswordInput, NumberKeyboard, CountDown, Toast} from 'vant'
    import {login, reset, sendMessage} from "@/api/passport";

    export default {
        name: "ShortMessageCode",
        components: {'code-input': PasswordInput, NumberKeyboard, CountDown},
        data() {
            return {
                verifyCode: '',
                showKeyboard: false,
                canResend: false
            }
        },
        computed: {
            formatPhone() {
                let phone = this.$route.query.phone;
                if (phone.length === 11) return phone.slice(0, 3) + " " + phone.slice(3, 7) + " " + phone.slice(7, 11);
                else return null;
            }
        },
        watch: {
            async verifyCode(code) {
                if (code.length === 6) {
                    Toast.loading({
                        mask: true,
                        duration: 5000,
                        message: '请稍等...'
                    });
                    let res = false;
                    switch (this.$route.query.option) {
                        case 'login':
                            res = await login({code, phone: this.$route.query.phone});
                            if (res) {
                                Toast.clear();
                                localStorage.setItem('token', res.token);
                                await this.$router.push('/profile');
                            }
                            break;
                        case 'reset':
                            let password = localStorage.getItem('psw');
                            localStorage.removeItem('psw');
                            res = await reset({
                                type: 'phone', data: {verify: code, account: this.$route.query.phone, password}
                            });
                            if (res) {
                                Toast.clear();
                                Toast.success(res.msg);
                                this.$router.go(-1);
                            }
                            break;
                    }
                }
            }
        },
        methods: {
            onInput(key) {
                this.verifyCode = (this.verifyCode + key).slice(0, 6);
            },
            onDelete() {
                this.verifyCode = this.verifyCode.slice(0, this.verifyCode.length - 1);
            },
            async resend() {
                this.canResend = false;
                this.$nextTick(()=>{
                    this.$refs['countDown'].reset();
                });
                await sendMessage({account: this.$route.query.phone, option: this.$route.query.option});
            }
        },
        beforeCreate() {
            this.$emit('setTitle', this.$route.meta.title);
        }
    }
</script>
