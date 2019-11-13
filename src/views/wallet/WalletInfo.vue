<template>
    <div class="wallet-info" v-show="show">
        <div class="flex-top">
            <div class="wallet-balance course-coin">
                <svg-icon data="@icon/coin.svg" class="coin-svg" color="#fff"></svg-icon>
                <span class="wallet-balance-info">课程币</span>
                <span class="wallet-balance-info balance">{{balance}}</span>
                <span class="balance-btn" @click="toRecharge">充值</span>
            </div>
            <div class="wallet-balance bst">
                <svg-icon data="@icon/bst-coin.svg" class="coin-svg" color="#fff"></svg-icon>
                <span class="wallet-balance-info">B S T</span>
                <span class="wallet-balance-info balance">{{bstBalance===-1?'未绑定':bstBalance}}</span>
                <span class="balance-btn" @click="getBstBalance(true)">刷新</span>
            </div>
        </div>
        <cell-group>
            <template v-if="bstAddress">
                <cell title="钱包账号" icon="paid" @click="openWalletInfoDialog" is-link/>
                <cell title="更换账号" icon="exchange" @click="bindDialogShow=true" is-link></cell>
            </template>
            <cell v-else title="添加账号" icon="add-o" @click="bindDialogShow=true" is-link></cell>
            <cell title="交易记录" icon="orders-o" is-link :to="{name:'user-balance-log'}"></cell>
            <cell title="BST账单" :to="{name:'wallet-bst-log'}" is-link>
                <svg-icon data="@icon/bst-orders.svg" slot="icon"></svg-icon>
            </cell>
        </cell-group>
        <van-dialog v-model="walletInfoShow" class="wallet-info-dialog" show-cancel-button
                    cancel-button-text="解绑" @cancel="unbindBstAddress">
            <div class="wallet-info-title" slot="title">
                <img class="avatar" :src="getImageUrl(avatarUrl)" alt>
                <div class="info van-ellipsis">{{nickname}}</div>
            </div>
            <img class="qr-code-image" :src="qrCodeUrl" alt>
            <div class="bst-address van-ellipsis" v-hammer:press="copyBstAddress">
                {{bstAddress}}
            </div>
        </van-dialog>
        <van-dialog v-model="bindDialogShow" title="请输入 BST 钱包密钥" class="wallet-change-dialog"
                    @confirm="setBstAddress" show-cancel-button>
            <div class="dialog-hint">只有绑定钱包后才能进行购买课程操作</div>
            <van-input v-model="bindAddress" clearable
                       placeholder="每个用户只能绑定一个钱包哦"></van-input>
        </van-dialog>
    </div>
</template>

<script>
    import {Cell, CellGroup, Button, Field, Toast, Dialog} from 'vant'
    import {getBstBalance, getKey, getWalletInfo, refreshRecharge} from "@/api/wallet"
    import {deleteBstWalletAddress, getPersonalInfo, setBstWalletAddress} from "@/api/profile"
    import {getImageUrl} from '@/utils/url'
    import QRCode from 'qrcode'
    import NodeRSA from 'node-rsa'

    export default {
        name: "WalletInfo",
        components: {
            Cell, CellGroup, 'van-input': Field, 'van-button': Button, 'van-dialog': Dialog.Component
        },
        data() {
            return {
                show: false,
                balance: 0.00,
                bstBalance: 0.00,
                key: null,
                bstAddress: null,
                walletInfoShow: false,
                nickname: null,
                avatarUrl: null,
                qrCodeUrl: null,
                bindDialogShow: false,
                bindAddress: null,
                getImageUrl
            }
        },
        methods: {
            async getWallet() {
                let res = await getWalletInfo();
                this.key = res.key;
                this.balance = res['wallet'].balance;
            },
            async getPersonal() {
                let res = await getPersonalInfo();
                this.bstAddress = res.data.bstAddress;
                this.avatarUrl = res.data.avatarUrl;
                this.nickname = res.data.nickname;
            },
            async getBstBalance(refresh) {
                if (refresh) Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner'
                });
                await refreshRecharge();
                let res = await getBstBalance({refresh});
                this.bstBalance = res.balance;
                Toast.clear();
            },
            async unbindBstAddress() {
                let res = await deleteBstWalletAddress();
                if (res) {
                    Toast.success(res.msg);
                    this.walletInfoShow = false;
                    await this.getPersonal();
                    await this.getBstBalance();
                }
            },
            async setBstAddress() {
                if (!this.bindAddress) Toast.fail('请输入内容');
                else {
                    let res = await getKey();
                    const rsa = new NodeRSA();
                    rsa.importKey(res.key, 'pkcs8-public');
                    res = await setBstWalletAddress({address: rsa.encrypt(this.bindAddress, 'base64', 'utf8')});
                    if (res) {
                        Toast.success(res.msg);
                        this.bindAddress = null;
                        await this.getPersonal();
                        await this.getBstBalance();
                    }
                }
            },
            openWalletInfoDialog() {
                if (!this.bstAddress) Toast.fail('请先绑定BST钱包后再进行操作');
                else {
                    QRCode.toDataURL(this.bstAddress).then(url => {
                        this.qrCodeUrl = url;
                        this.walletInfoShow = true;
                    }).catch(err => {
                        console.error(err)
                    });
                }
            },
            copyBstAddress() {
                this.$copyText(this.bstAddress).then(() => {
                    Toast.success('已复制钱包地址');
                }).catch((err) => {
                    console.log("err:" + err);
                    Toast.fail('您的设备暂不支持复制功能');
                })
            },
            toRecharge() {
                this.$router.push({name: 'wallet-recharge'})
            }
        },
        async created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            await this.getPersonal();
            await this.getWallet();
            await this.getBstBalance();
            this.show = true;
            Toast.clear();
        }
    }
</script>

<style lang="less">
    .wallet-info {
        .flex-top {
            padding: 16px;
        }

        .wallet-balance {
            padding: 0 16px;
            height: 85px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: space-between;
            border-radius: 4px;

            .balance {
                flex-basis: 150px;
            }
        }

        .course-coin {
            margin-bottom: 16px;
            background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
        }

        .bst {
            background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);
        }

        .wallet-balance-info {
            font-size: 22px;
            color: #fff;
            line-height: 22px;
            flex-basis: 72px;
        }

        .balance-btn {
            font-size: 14px;
            padding: 0 15px;
            border: 1px solid #fff;
            border-radius: 3px;
            line-height: 24px;
            color: #fff;
        }

        .coin-svg {
            width: 21px;
            height: 21px;
        }

        .van-cell-group {
            .van-cell {
                padding: 16px;
                font-size: 18px;

                i {
                    font-size: 18px;
                }

                .svg-icon {
                    width: 18px;
                    height: 24px;
                    margin-right: 5px;
                }
            }
        }

        .wallet-info-dialog {
            .van-dialog__header {
                padding: 0;
                border-bottom: 1px solid #ebedf0;
            }

            .wallet-info-title {
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                height: 65px;

                .info {
                    font-size: 21px;
                    margin-left: 15px;
                    max-width: 150px;
                }

                .avatar {
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                }
            }

            .van-dialog__content {
                padding: 10px;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                -webkit-flex-direction: column;

                .qr-code-image {
                    width: 160px;
                    height: 160px;
                }

                .bst-address {
                    width: 240px;
                    background-color: #fff;
                    border: 0;
                }
            }
        }

        .wallet-change-dialog {
            text-align: center;

            .van-dialog__content {
                padding: 0 15px;
            }

            .van-field {
                background-color: #f2f2f6;
                margin-bottom: 20px;
            }

            .dialog-hint {
                margin: 10px 0;
                font-size: 13px;
                color: #969799;
            }
        }
    }
</style>
