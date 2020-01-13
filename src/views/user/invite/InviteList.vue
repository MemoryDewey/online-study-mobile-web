<template>
    <div class="user-invite-list">
        <div v-if="sum>0" class="invite-total">
            <h1>成功邀请 {{sum}} 人</h1>
        </div>
        <div class="invite-list">
            <van-list v-model="loading" finished-text="已经到底啦" :finished="finished"
                      @load="listOnload">
                <cell v-for="(log,index) in logs" :key="index"
                      :title="log['Invited'].nickname"
                      :value="log['Invited']['UserPassport'].phone"
                      :label="log['createdAt']"
                      clickable/>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {List, Cell, Toast} from 'vant'
    import {getInvite} from "@/api/profile";

    export default {
        name: "InviteList",
        components: {
            Cell, 'van-list': List
        },
        data() {
            return {
                show: false,
                loading: false,
                sum: 0,
                page: 1,
                loadingTimes: 1,
                finished: false,
                logs: []
            }
        },
        methods: {
            async getInviteLog(page) {
                let res = await getInvite({page});
                if (res) {
                    this.page = res['pageSum'];
                    this.sum = res['count'];
                    this.loading = false;
                    for (let log of res['invites']) {
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
                        await this.getInviteLog(this.loadingTimes);
                        this.show = true;
                        Toast.clear();
                    }
                }, 500);
            },
        },
        beforeCreate() {
            this.$emit('setNavBarRight', {show: false});
        }
    }
</script>

<style lang="less">
    .user-invite-list {
        .invite-total {
            height: 54px;
            background: linear-gradient(to right, #4bb0ff, #6149f6);
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            color: #fff;
        }
        .invite-list{
            height: calc(100vh - 100px);
        }
    }
</style>
