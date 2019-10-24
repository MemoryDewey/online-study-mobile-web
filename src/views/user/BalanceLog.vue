<template>
    <div class="user-balance-log">
        <van-list v-model="loading" finished-text="没有更多了" :finished="finished"
                  :immediate-check="false" @load="listOnload">
            <cell v-for="(log,index) in logs" :key="index"
                  :title="log['details']" :label="setStatusText(log['status'])"></cell>
        </van-list>
    </div>
</template>

<script>
    import {List, Cell} from 'vant'
    import {getWalletLog} from "@/api/wallet"

    export default {
        name: "BalanceLog",
        components: {
            'van-list': List, Cell
        },
        data() {
            return {
                loading: false,
                loadingTimes: 1,
                finished: false,
                logs: []
            }
        },
        methods: {
            async getWalletLog(page) {
                let res = await getWalletLog({page});
                if (res) {
                    this.loading = false;
                    for (let log of res.logs) {
                        this.logs.push(log);
                    }
                    this.loadingTimes++;
                }
            },
            listOnload() {
                setTimeout(() => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        this.getWalletLog(this.loadingTimes);
                    }
                }, 500);
            },
            setStatusText(status){
                switch (status) {
                    case 'Accept':
                        return '交易成功';
                    case 'Reject':
                        return '交易失败';
                    case 'Pending':
                        return '交易中..';
                }
            }
        },
        created() {
            this.listOnload();
        }
    }
</script>

<style lang="less">
    .user-balance-log {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;
    }
</style>
