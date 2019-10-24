<template>
    <div class="user-collection">
        <div class="grid-fixed">
            <grid :column-num="2" v-if="titleRight==='cancel'">
                <grid-item>全选</grid-item>
                <grid-item>删除</grid-item>
            </grid>
        </div>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem, Grid, GridItem} from 'vant'

    export default {
        name: "Collection",
        components: {
            Tabbar, TabbarItem, Grid, GridItem
        },
        data() {
            return {
                titleRight: 'set'
            }
        },
        methods: {
            titleRightSet() {
                this.titleRight = 'cancel';
                this.$emit('setNavBarRight', {show: true, text: '取消', funcName: 'titleRightCancel'});
            },
            titleRightCancel() {
                this.titleRight = 'set';
                this.$emit('setNavBarRight', {show: true, text: '管理', funcName: 'titleRightSet'});
            }
        },
        created() {
            this.$emit('setNavBarRight', {show: true, text: '管理', funcName: 'titleRightSet'});
        }
    }
</script>

<style lang="less">
    .user-collection {
        .grid-fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;

            .van-grid-item__content {
                font-size: 16px;
            }
        }
    }
</style>
