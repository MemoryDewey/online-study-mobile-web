<template>
    <div class="wallet-info">
        <div class="flex-top">
            <div class="wallet-balance course-coin">
                <svg-icon data="@icon/coin.svg" class="coin-svg" color="#fff"></svg-icon>
                <span class="wallet-balance-info">课程币</span>
                <span class="wallet-balance-info balance" style="flex-basis: 150px;">{{balance}}</span>
                <span class="recharge-btn">充值</span>
            </div>
            <div class="wallet-balance bst">
                <svg-icon data="@icon/bst-coin.svg" class="coin-svg" color="#fff"></svg-icon>
                <span class="wallet-balance-info">B S T</span>
                <span class="wallet-balance-info balance">{{bstBalance}}</span>
            </div>
        </div>
        <cell-group>
            <cell title="钱包账号" icon="paid" is-link/>
            <cell title="我的收入" icon="down" is-link></cell>
            <cell title="交易记录" icon="orders-o" is-link></cell>
        </cell-group>
    </div>
</template>

<script>
    import {Cell, CellGroup, Button} from 'vant'
    import {getBstBalance, getWalletInfo} from "@/api/wallet"

    export default {
        name: "WalletInfo",
        components: {
            Cell, CellGroup, 'van-button': Button
        },
        data() {
            return {
                balance: 0.00,
                bstBalance: 0.00,
                key: null,
            }
        },
        methods: {
            async getWallet() {
                let res = await getWalletInfo();
                this.key = res.key;
                this.balance = res['wallet'].balance;
                res = await getBstBalance({refresh: true});
                this.bstBalance = res.balance;
            }
        },
        created() {
            this.getWallet();
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
        }

        .course-coin {
            margin-bottom: 16px;
            background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);

            .balance {
                flex-basis: 150px;
            }
        }

        .bst {
            background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);

            .balance {
                flex-basis: 210px;
            }
        }

        .wallet-balance-info {
            font-size: 22px;
            color: #fff;
            line-height: 22px;
            flex-basis: 72px;
        }

        .recharge-btn {
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

        .van-cell {
            padding: 16px;
            font-size: 18px;

            i {
                font-size: 18px;
            }
        }
    }
</style>
