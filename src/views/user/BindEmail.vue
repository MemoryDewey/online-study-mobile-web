<template>
    <div id="user-bind-email">
        <section>
            <van-input v-model="email" placeholder="请输入新绑定邮箱"
                       :error-message="(isEmail(email) || email.length===0)?'':'邮箱格式错误'"
                       :border="false" clearable></van-input>
            <van-input v-model="verifyCode" @input="bindEmail"
                       center clearable maxlength="6"
                       placeholder="请输入邮箱验证码">
                <van-button slot="button" size="small" type="primary" :disabled="!canResend || !isEmail(email)"
                            color="#1989fa" @click="sendEmail">
                    <count-down v-if="!canResend" format="ss秒后重新发送" ref="countDown"
                                :time="1000*60" @finish="canResend = true">
                    </count-down>
                    <span v-else>发送验证码</span>
                </van-button>
            </van-input>
        </section>
    </div>
</template>

<script>
    import {Field, Button, CountDown, Toast} from 'vant'
    import isEmail from 'validator/lib/isEmail'
    import {addEmail, sendEmail} from "@/api/passport"

    export default {
        name: "BindEmail",
        components: {'van-input': Field, 'van-button': Button, CountDown},
        data() {
            return {
                email: '',
                verifyCode: '',
                isEmail,
                canResend: true
            }
        },
        methods: {
            async sendEmail() {
                if (this.canResend) {
                    this.canResend = false;
                    this.$nextTick(()=>{
                        this.$refs['countDown'].reset();
                    });
                    const res = await sendEmail({account: this.email});
                    if (res) Toast.success(res.msg);
                }
            },
            async bindEmail(value) {
                if (value.length === 6) {
                    Toast.loading({
                        mask: true,
                        duration: 5000,
                        message: '请稍等...'
                    });
                    const res = await addEmail({account: this.email, verifyCode: value});
                    if (res) {
                        Toast.success(res.msg);
                        this.$store.commit('changeInfo', {key: 'email', value: this.email});
                        await this.$router.go(-1);
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    #user-bind-email {
        section {
            margin-top: 20px;
        }

        .van-field {
            background-color: transparent;

            .van-field__body {
                border-bottom: 1px solid #1989fa;
            }
        }

        .van-count-down {
            color: #fff;
            font-size: 14px;
        }
    }
</style>
