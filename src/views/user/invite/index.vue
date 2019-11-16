<template>
    <div class="user-invite">
        <h1 class="invite-title">邀请好友领福利</h1>
        <div class="invite-info">
            <div class="invite-top">
                <h2 class="invite-info-title">您的邀请码为</h2>
                <h2 v-hammer:press="copyInviteUrl" class="invite-info-code van-ellipsis">{{inviteCode}}</h2>
                <div class="invite-info-intro">长按邀请码可复制邀请链接</div>
            </div>
            <div class="invite-bottom">
                <img class="qr-code-image" :src="qrCodeUrl" alt>
                <div class="invite-info-intro">邀请专属二维码</div>
            </div>
        </div>
        <router-link :to="{name:'user-invite-list'}" class="invite-log" tag="div">查看邀请记录</router-link>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import QRCode from 'qrcode'
    import {getInviteCode} from "@/api/profile"
    import {getInviteUrl} from "@/utils/url";

    export default {
        name: "Invite",
        data() {
            return {
                inviteCode: null,
                inviteUrl: null,
                qrCodeUrl: null
            }
        },
        methods: {
            gotoIntro() {
                this.$router.push({name: 'user-invite-intro'})
            },
            async getInviteCode() {
                let res = await getInviteCode();
                if (res) {
                    this.inviteCode = res.inviteCode;
                    this.inviteUrl = getInviteUrl(`/passport/login-phone?invite=${this.inviteCode}`);
                    QRCode.toDataURL(this.inviteUrl).then(url => {
                        this.qrCodeUrl = url;
                    }).catch(err => {
                        console.error(err)
                    });
                }
            },
            copyInviteUrl() {
                this.$copyText(this.inviteUrl).then(() => {
                    Toast.success('已复制邀请地址');
                }).catch((err) => {
                    console.log(err);
                    Toast.fail('您的设备暂不支持复制功能');
                })
            }
        },
        async created() {
            this.$emit('setNavBarRight', {show: true, icon: 'question', funcName: 'gotoIntro'});
            await this.getInviteCode();
        }
    }
</script>

<style lang="less">
    .user-invite {
        height: calc(100vh - 46px);
        background-image: url("../../../assets/image/invite-image.jpg");
        background-size: cover;

        h1, h2 {
            margin: 0;
            padding: 0;
        }

        .invite-title {
            padding-top: 20px;
            text-align: center;
            font-size: 36px;
            color: #fff;
        }

        .invite-info {
            margin: 20px 40px;
            padding: 20px;
            background-color: #fff;
            height: 320px;
            border-radius: 10px;

            .invite-info-title {
                font-size: 20px;
                color: #000;
                margin-bottom: 5px;
            }

            .invite-info-code {
                max-width: 200px;
                font-size: 26px;
                color: #ff4343;
            }

            .invite-info-intro {
                padding: 10px 0;
                font-size: 16px;
                color: #7d7e80;
            }

            .qr-code-image {
                width: 160px;
                height: 160px;
                border: 1px solid #f1f1f1;
            }
        }

        .invite-flex {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            flex-direction: column;
            -webkit-flex-direction: column;
        }

        .invite-top {
            height: 110px;
            border-bottom: 1px solid #f1f1f1;
            .invite-flex();
        }

        .invite-bottom {
            margin-top: 15px;
            .invite-flex();
        }

        .invite-log {
            font-size: 18px;
            color: #fff;
            text-align: center;
        }
    }
</style>
