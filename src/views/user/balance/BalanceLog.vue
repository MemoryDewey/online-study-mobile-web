<template>
    <div class="user-balance-log" v-show="show">
        <van-list v-if="logs.length>0" v-model="loading" finished-text="已经到底啦" :finished="finished"
                  :immediate-check="false" @load="listOnload">
            <cell v-for="(log,index) in logs" :key="index"
                  :title="log['details']" :label="setStatusText(log['status'])">
                <span :style="{color:log['type']==='Income'?'#1989fa':'#323233'}">{{
                    `${log['type']==='Income'?'+':'-'}${log['amount']}`}}</span>
                <div>{{log.time}}</div>
            </cell>
        </van-list>
        <div v-else class="list-no-data">
            <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"></svg-icon>
            <div class="no-data-text">无交易记录</div>
        </div>
    </div>
</template>

<script>
    import {List, Cell, Toast} from 'vant'
    import {getWalletLog} from "@/api/wallet"

    export default {
        name: "BalanceLog",
        components: {
            'van-list': List, Cell
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
                let res = await getWalletLog({page});
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
            setStatusText(status) {
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
    .user-balance-log {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;

        .van-cell {
            padding: 16px;
        }
    }
</style>
