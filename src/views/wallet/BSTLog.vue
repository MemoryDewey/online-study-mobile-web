<template>
    <div v-show="show" class="wallet-bst-log">
        <van-list v-if="logs.length>0" v-model="loading" finished-text="没有更多了" :finished="finished"
                  :immediate-check="false" @load="listOnload">
            <cell v-for="(log,index) in logs" :key="index" clickable @click="copyTxHash(log['txHash'])"
                  :title="setProductTypeText(log['productType'])">
                <div slot="label" class="tx-hash van-ellipsis">{{log['txHash']}}</div>
                <span :style="{color:log['productType']==='Expend'?'#1989fa':'#323233'}">{{
                    `${log['productType']==='Expend'?'+':'-'}${log['amount']}`}} BST</span>
                <div>{{log['createdAt']}}</div>
            </cell>
        </van-list>
        <div v-else class="list-no-data">
            <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"></svg-icon>
            <div class="no-data-text">无BST交易记录</div>
        </div>
    </div>
</template>

<script>
    import {List, Cell, Toast, Notify} from 'vant'
    import {getBstWalletLog} from "@/api/wallet"

    export default {
        name: "BSTLog",
        components: {
            Cell, 'van-list': List
        },
        data() {
            return {
                show: false,
                loading: false,
                page: 1,
                loadingTimes: 1,
                finished: false,
                logs: []
            }
        },
        methods: {
            async getWalletLog(page) {
                let res = await getBstWalletLog({page});
                if (res) {
                    this.page = res['pageSum'];
                    this.loading = false;
                    for (let log of res.logs) {
                        this.logs.push(log);
                    }
                    this.loadingTimes++;
                }
            },
            listOnload() {
                setTimeout(async () => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        await this.getWalletLog(this.loadingTimes);
                        this.show = true;
                        Toast.clear();
                    }
                }, 500);
            },
            setProductTypeText(productType) {
                switch (productType) {
                    case 'Course':
                        return '购买课程';
                    case 'Expend':
                        return '课程币兑换';
                    case 'Recharge':
                        return '课程币充值';
                }
            },
            copyTxHash(txHash) {
                this.$copyText(txHash).then(() => {
                    Notify({type: 'success', message: '已成功复制区块信息'});
                }).catch(() => {
                    Notify({type: 'danger', message: '您的设备暂不支持复制功能'});
                })
            }
        },
        created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.listOnload();
        }
    }
</script>

<style lang="less">
    .wallet-bst-log {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;

        .tx-hash {
            width: 164px;
        }

        .van-cell {
            padding: 16px;
        }
    }
</style>
