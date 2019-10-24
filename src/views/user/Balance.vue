<template>
    <div id="user-balance">
        <section>
            <span>总余额</span>
            <div class="balance">
                <svg-icon data="@icon/coin.svg" class="balance-icon" color="#dcbb70"></svg-icon>
                <a>{{balance}}</a>
            </div>
        </section>
        <div class="balance-intro">
            <router-link :to="{name:'user-balance-intro'}" slot="right" tag="span">余额说明</router-link>
        </div>
    </div>
</template>

<script>
    import {NavBar} from 'vant'
    import {getWalletInfo} from "@/api/wallet"

    export default {
        name: "Balance",
        components: {NavBar},
        data() {
            return {
                balance: 0
            }
        },
        methods: {
            gotoBalanceLog() {
                this.$router.push({name: 'user-balance-log'});
            }
        },
        created() {
            this.$emit('setNavBarRight', {show: true, text: '余额明细', funcName: 'gotoBalanceLog'});
            getWalletInfo().then(res => {
                if (res) this.balance = parseFloat(res['wallet'].balance).toFixed(2);
            });
        },
        beforeRouteLeave(to, from, next) {
            this.$emit('setNavBarRight', {show: false});
            next();
        }
    }
</script>

<style lang="less">
    #user-balance {
        section {
            margin-top: 50px;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            flex-direction: column;
            -webkit-flex-direction: column;

            span {
                font-size: 14px;
                color: #7d7e80;
                margin-left: 10px;
            }

            .balance {
                margin-top: 5px;
                font-size: 40px;

                a, svg {
                    vertical-align: middle;
                }
            }

            .balance-icon {
                width: 35px;
                height: 35px;
                margin-right: 10px;
            }
        }

        .balance-intro {
            width: 100%;
            margin-top: 420px;
            text-align: center;

            span {
                font-size: 14px;
                color: #1989fa;
            }
        }
    }
</style>
