<template>
    <div v-show="show" class="wallet-recharge">
        <div class="recharge-header">
            <div class="balance-title">可用余额</div>
            <div class="balance-number">{{parseFloat(balance).toFixed(2)}}<span>课程币</span></div>
        </div>
        <div class="recharge-body">
            <grid gutter="0.3rem" :column-num="3">
                <grid-item v-for="(value,index) in rechargeNumber" :key="index"
                           :class="{active:value===rechargeMoney && !isRechargeCustom}"
                           @click="rechargeChoose(value)">
                    <div class="trade-count">{{value}}<span class="trade-name">课程币</span></div>
                    <div class="bst-price">{{(value/bstPrice).toFixed(2)}} BST</div>
                </grid-item>
            </grid>
            <div class="input-error"
                 :style="{visibility:rechargeCustomValid?'hidden':'visible'}">单笔最多充值5000个课程币
            </div>
            <van-input v-model="rechargeCustom" placeholder="自定义课程币数量（1-5000）" :border="false"
                       maxlength="4" type="number"
                       @input="validRechargeCustom"
                       @focus="isRechargeCustom=true">
                <icon v-if="!rechargeCustomValid" name="warning-o" slot="right-icon" color="#ee0a24"></icon>
            </van-input>
        </div>
        <div class="recharge-footer">
            <div class="pay-btn" @click="recharge">确认支付 {{rechargeValue}}</div>
        </div>
    </div>
</template>

<script>
    import {Grid, GridItem, Toast, Field, Icon} from 'vant'
    import {getBstValue, getWalletInfo, recharge} from "@/api/wallet"
    import socketClient from 'socket.io-client'
    import {getWebsocketUrl} from "@/utils/url";

    export default {
        name: "Recharge",
        components: {
            GridItem, Grid, 'van-input': Field, Icon
        },
        data() {
            return {
                show: false,
                balance: 0,
                bstPrice: 0,
                rechargeNumber: [10, 20, 50, 100, 200, 500],
                rechargeMoney: 50,
                isRechargeCustom: false,
                rechargeCustomValid: true,
                rechargeCustom: null,
                rechargeValue: null
            }
        },
        methods: {
            async getBstPrice() {
                let res = await getBstValue();
                if (res) this.bstPrice = res.price;
                this.rechargeValue = `${(50 / this.bstPrice).toFixed(2)} BST`
            },
            async getWallet() {
                let res = await getWalletInfo();
                this.balance = res['wallet'].balance;
            },
            rechargeChoose(value) {
                this.isRechargeCustom = false;
                this.rechargeMoney = value;
                this.rechargeValue = `${(value / this.bstPrice).toFixed(2)} BST`
            },
            validRechargeCustom() {
                if (this.rechargeCustom === '') {
                    this.rechargeCustomValid = true;
                    this.rechargeCustom = null;
                    this.rechargeValue = null;
                } else {
                    let price = parseInt(this.rechargeCustom);
                    if (isNaN(price)) {
                        this.rechargeCustomValid = false;
                        this.rechargeValue = null;
                    } else if (price <= 0 || price > 5000) {
                        this.rechargeCustomValid = false;
                        this.rechargeValue = null;
                    } else {
                        this.rechargeCustomValid = true;
                        this.rechargeValue = `${(price / this.bstPrice).toFixed(2)} BST`;
                    }
                }
            },
            async recharge() {
                if (!this.rechargeValue) Toast.fail('请选择正确的充值金额');
                else {
                    Toast.loading({
                        message: '支付中，请稍等...',
                        forbidClick: true,
                        loadingType: 'spinner',
                        duration: 10000
                    });
                    let amount = this.rechargeCustom ? this.rechargeCustom : this.rechargeMoney;
                    let res = await recharge({amount});
                    if (!res) return;
                    const socketUrl = getWebsocketUrl();
                    const socket = socketClient.connect(socketUrl);
                    socket.emit('recharge');
                    socket.on('rechargeMessage', data => {
                        Toast.clear();
                        if (data.status === 1) {
                            Toast.success(data.msg);
                            this.getWallet();
                        } else {
                            Toast.fail('交易失败');
                            console.log(data.msg);
                        }
                    });
                }
            }
        },
        async created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            await this.getBstPrice();
            await this.getWallet();
            Toast.clear();
            this.show = true;
        }
    }
</script>

<style lang="less">
    .wallet-recharge {
        @wallet-recharge-color: #7493f8;

        .recharge-header {
            height: 120px;
            border-bottom: 1px solid #ebeef5;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            flex-direction: column;
            -webkit-flex-direction: column;
            background-image: url("../../assets/image/recharge-background.png");
            background-repeat: no-repeat;

            .balance-title {
                font-size: 18px;
                color: #323233;
            }

            .balance-number {
                font-size: 32px;
                margin-top: 10px;
                color: @wallet-recharge-color;

                span {
                    font-size: 18px;
                    margin-left: 5px;
                }
            }
        }

        .recharge-body {
            padding: 20px 0;

            .van-grid-item__content {
                border-radius: 4px;
            }

            .active {
                .van-grid-item__content {
                    background-color: @wallet-recharge-color;
                }

                .trade-count, .bst-price {
                    color: #fff;
                }
            }

            .trade-count {
                font-size: 24px;
                color: #323233;
            }

            .trade-name {
                font-size: 14px;
                margin-left: 5px;
            }

            .bst-price {
                font-size: 14px;
                color: #757575;
                margin-top: 5px;
            }

            .input-error {
                font-size: 14px;
                color: #ee0a24;
                padding: 10px 16px 0;
            }

            .van-cell {
                padding: 0 16px;
            }

            .van-field {
                background-color: transparent;

                .van-field__body {
                    border-bottom: 1px solid @wallet-recharge-color;
                }
            }
        }

        .recharge-footer {
            width: 100%;
            position: fixed;
            bottom: 0;
            text-align: center;

            .pay-btn {
                margin: 10px 16px;
                padding: 10px 0;
                border-radius: 4px;
                background-color: @wallet-recharge-color;
                font-size: 16px;
                color: #fff;
            }
        }
    }
</style>
