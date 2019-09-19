<template>
    <div id="profile">
        <section>
            <cell-group>
                <cell>
                    <van-row style="padding: 1vh 0">
                        <van-col :span="6">
                            <div class="avatar">
                                <icon name="manager" size="12vw"></icon>
                            </div>
                        </van-col>
                        <van-col :span="18">
                            <div class="info">
                                <h2>未登录</h2>
                            </div>
                        </van-col>
                    </van-row>
                </cell>
                <cell>
                    <grid :column-num="3" :border="false">
                        <grid-item icon="orders-o" text="课程管理"></grid-item>
                        <grid-item icon="balance-pay" text="我的钱包"></grid-item>
                        <grid-item icon="like-o" text="收藏"></grid-item>
                    </grid>
                </cell>
            </cell-group>
        </section>
        <section>
            <cell title="最近在学" is-link></cell>
        </section>
    </div>
</template>

<script>
    import {CellGroup, Icon, Cell, Row, Col, Grid, GridItem} from 'vant'

    export default {
        name: "Profile",
        components: {Cell, Icon, CellGroup, "van-row": Row, "van-col": Col, Grid, GridItem},
        data() {
            return {
                isLogin: false
            }
        },
        beforeCreate() {
            this.$emit('setTab', true);
        }
    }
</script>

<style lang="less">
    #profile {
        height: calc(100vh - 50px);
        background-color: #f6f6f6;

        section{
            margin-bottom: 1vh;
        }

        .avatar {
            width: 18vw;
            height: 18vw;
            border-radius: 50%;
            border: 1px solid #f6f6f6;
            background-color: #f6f6f6;
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            i {
                margin: auto;
            }
        }

        .van-cell:not(:last-child)::after {
            left: 0;

        }

        .van-grid-item__content {
            padding: 4px 8px;
        }

        .info {
            height: 18vw;
            display: table-cell;
            vertical-align: middle;

            h2 {
                font-weight: 500;
                vertical-align: middle;
            }
        }
    }
</style>
