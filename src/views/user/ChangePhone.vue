<template>
    <div id="user-change-phone">
        <nav-bar left-arrow :title="this.$route.meta.title" @click-left="routerGo"></nav-bar>
        <section>
            <div class="safety-top">
                <svg-icon class="safety-icon" data="@icon/safety-setting.svg" color="#1296db"></svg-icon>
                <template v-if="step === 0">
                    <div class="safety-text">
                        <span>为了您的账户安全，需要验证您的手机</span>
                    </div>
                    <div class="safety-text">
                        <span>{{$route.query.phone}}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="safety-text">
                        <span>请输入您需要绑定的新手机号码</span>
                    </div>
                </template>
            </div>
            <template v-if="step === 0">
                <van-input v-model="verifyCode" label="验证码" placeholder="请输入验证码">
                    <template slot="button">
                        <count-down v-if="!canResend" format="ss秒重新发送"
                                    :time="1000*90" @finish="canResend = true">
                        </count-down>
                        <span v-else class="get-code" @click="sendMsg">获取验证码</span>
                    </template>
                </van-input>
                <van-button class="next-btn" type="info" @click="changePhone"
                            :disabled="!verifyCode">下一步
                </van-button>
            </template>
            <template v-else>
                <van-input v-model="newPhone" label="新手机号" placeholder="请输入新手机号码">
                    <template slot="button">
                        <count-down v-if="!canResend" format="ss秒重新发送"
                                    :time="1000*90" @finish="canResend = true">
                        </count-down>
                        <span v-else class="get-code" @click="sendMsg">获取验证码</span>
                    </template>
                </van-input>
                <van-input v-model="verifyCode" label="验证码" placeholder="请输入验证码"></van-input>
                <van-button class="next-btn" type="info" @click="changePhone"
                            :disabled="!verifyCode || !checkPhone">下一步
                </van-button>
            </template>
        </section>
    </div>
</template>

<script>
    import {NavBar, Field, Button, CountDown, Toast} from 'vant'
    import {sendMessage} from "@/api/passport";
    import {changePhone} from "@/api/profile";

    export default {
        name: "ChangePhone",
        components: {NavBar, 'van-input': Field, 'van-button': Button, CountDown},
        data() {
            return {
                verifyCode: '',
                newPhone: '',
                step: 0,
                canResend: true
            }
        },
        computed: {
            checkPhone() {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                return this.newPhone.match(regPhone);
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1)
            },
            async sendMsg() {
                if (this.step === 1) {
                    const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                    if (!this.newPhone.match(regPhone)) return;
                }
                if (this.canResend) {
                    this.canResend = false;
                    this.$nextTick(() => {
                        this.$refs['countDown'].reset();
                    });
                    await sendMessage({account: this.step === 1 ? this.newPhone : undefined, option: 'change'});
                }
            },
            async changePhone() {
                let data = this.step === 0 ?
                    {verifyCode: this.verifyCode} : {account: this.newPhone, verifyCode: this.verifyCode};
                const res = await changePhone({data, step: this.step});
                if (res) {
                    if (this.step === 0) {
                        this.canResend = true;
                        this.verifyCode = '';
                        this.$nextTick(() => {
                            this.$refs['countDown'].reset();
                        });
                        this.step = 1;
                    } else {
                        Toast.success("更改成功");
                        this.$store.commit('changeInfo', {key: 'mobile', value: res.msg});
                        await this.$router.go(-1);
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    #user-change-phone {
        section {
            margin-top: 20px;

            .safety-top {
                display: flex;
                align-items: center;
                flex-direction: column;
                margin-bottom: 20px;

                .safety-icon {
                    width: 80px;
                    height: 80px;
                }

                .safety-text {
                    margin-top: 10px;
                    font-size: 14px;
                }
            }

            .get-code, .van-count-down {
                padding-left: 10px;
                border-left: 1px solid;
                color: #969799;
            }

            .next-btn {
                margin: 20px 10px;
                padding: 0;
                width: 355px
            }
        }
    }
</style>
