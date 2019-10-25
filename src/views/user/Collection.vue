<template>
    <div class="user-collection">
        <checkbox-group v-model="result" ref="checkboxGroup">
            <cell-group>
                <cell v-for="(item, index) in list" clickable :key="item" @click="toggle(index)">
                    <checkbox v-if="titleRight==='cancel'" :name="item" ref="checkboxes" slot="icon"/>
                    <van-row class="collection-cell">
                        <van-col :span="titleRight==='cancel'?10:9">
                            <img v-lazy="`/images/course-cover/9bc1873da8cdaab9a72f0d5fc6fb242a.jpg`" alt>
                        </van-col>
                        <van-col :span="titleRight==='cancel'?14:15">
                            <h3 class="course-name">JAVA零基础到架构师全套课程第三模块(核心API)IT全明星IT全明星</h3>
                            <p class="course-info">
                                <span class="course-price">311 课程币</span>
                                <span class="course-apply">500人报名</span>
                            </p>
                        </van-col>
                    </van-row>
                </cell>
            </cell-group>
        </checkbox-group>
        <div class="grid-fixed">
            <grid :column-num="2" v-if="titleRight==='cancel'" clickable>
                <grid-item @click="selectAll">{{isSelectAll?'取消全选':'全选'}}</grid-item>
                <grid-item :class="{'delete-disable':!getListLength,'delete-active':!!getListLength}">
                    删除{{getListLength}}
                </grid-item>
            </grid>
        </div>
    </div>
</template>

<script>
    import {Cell, CellGroup, Grid, GridItem, Checkbox, CheckboxGroup, Row, Col} from 'vant'

    export default {
        name: "Collection",
        components: {
            Cell, CellGroup, Grid, GridItem, Checkbox, CheckboxGroup, 'van-row': Row, 'van-col': Col
        },
        data() {
            return {
                titleRight: 'set',
                isSelectAll: false,
                result: [],
                collectionList: [{}],
                list: ['a', 'b', 'c', 'd']
            }
        },
        computed: {
            getListLength() {
                if (this.result.length === this.list.length) this.isSelectAll = true;
                return this.result.length > 0 ? `(${this.result.length})` : null;
            }
        },
        methods: {
            titleRightSet() {
                this.titleRight = 'cancel';
                this.isSelectAll = false;
                this.$emit('setNavBarRight', {show: true, text: '取消', funcName: 'titleRightCancel'});
            },
            titleRightCancel() {
                this.titleRight = 'set';
                this.isSelectAll = false;
                this.result = [];
                this.$emit('setNavBarRight', {show: true, text: '管理', funcName: 'titleRightSet'});
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            selectAll() {
                this.isSelectAll = !this.isSelectAll;
                if (this.isSelectAll) {
                    this.$refs.checkboxGroup.toggleAll(true);
                } else {
                    this.$refs.checkboxGroup.toggleAll();
                }
            }
        },
        created() {
            this.$emit('setNavBarRight', {show: true, text: '管理', funcName: 'titleRightSet'});
        }
    }
</script>

<style lang="less">
    .user-collection {
        .collection-cell {
            .van-col {
                height: 68px;
            }

            img {
                width: 120px;
                height: 100%;
            }

            .course-name {
                font-size: 16px;
                font-weight: 400;
                line-height: 20px;
                margin: 0;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .course-info {
                line-height: 20px;
                overflow: hidden;
                margin: 8px 0 0;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
            }

            .course-price {
                font-size: 14px;
                color: #ee0a24;
            }

            .course-apply{
                font-size: 12px;
                margin-left: 10px;
                color: #999;
            }
        }

        .van-checkbox {
            margin-right: 16px;
        }

        .grid-fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;

            .van-grid-item__content {
                font-size: 16px;
                color: #000;
            }

            .delete-disable {
                pointer-events: none;

                .van-grid-item__content {
                    color: #888;
                }
            }

            .delete-active {
                .van-grid-item__content {
                    color: #ff4343;
                }
            }
        }
    }
</style>
