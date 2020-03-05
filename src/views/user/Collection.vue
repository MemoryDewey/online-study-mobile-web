<template>
    <div v-show="show" class="user-collection" :class="{'user-collection-selected':!titleSet}">
        <template v-if="list.length>0">
            <checkbox-group v-model="result" ref="checkboxGroup">
                <cell-group>
                    <cell v-for="(item, index) in list" clickable :key="item.id" @click="toggle(index)">
                        <checkbox v-if="!titleSet" :name="item.id" ref="checkboxes" slot="icon"/>
                        <van-row class="collection-cell">
                            <van-col :span="titleSet?9:10">
                                <img v-lazy="getImageUrl(item.image)" alt>
                            </van-col>
                            <van-col :span="titleSet?15:14">
                                <h3 class="course-name">{{item.name}}</h3>
                                <p class="course-info">
                                <span class="course-price" :class="{free:item.price===0}">
                                    {{
                                    item.price===0?'免费'
                                    : `${item.price} 课程币`
                                    }}</span>
                                    <span class="course-apply">{{item['apply']}}人报名</span>
                                </p>
                            </van-col>
                        </van-row>
                    </cell>
                </cell-group>
            </checkbox-group>
            <div class="grid-fixed">
                <grid :column-num="2" v-if="!titleSet" clickable>
                    <grid-item @click="selectAll">{{isSelectAll?'取消全选':'全选'}}</grid-item>
                    <grid-item @click="deleteCollection"
                               :class="{'delete-disable':!getListLength,'delete-active':!!getListLength}">
                        删除{{getListLength}}
                    </grid-item>
                </grid>
            </div>
        </template>
        <div v-else class="list-no-data">
            <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"></svg-icon>
            <div class="no-data-text">暂无收藏的课程</div>
        </div>
    </div>
</template>

<script>
    import {Cell, CellGroup, Grid, GridItem, Checkbox, CheckboxGroup, Row, Col, Toast} from 'vant'
    import {getCollection, deleteCollection} from "@/api/course"
    import {getImageUrl} from "@/utils/url"

    export default {
        name: "Collection",
        components: {
            Cell, CellGroup, Grid, GridItem, Checkbox, CheckboxGroup, 'van-row': Row, 'van-col': Col
        },
        data() {
            return {
                show: false,
                titleSet: true,
                isSelectAll: false,
                result: [],
                collectionList: [{}],
                list: [],
                getImageUrl
            }
        },
        computed: {
            getListLength() {
                this.isSelectAll = this.result.length === this.list.length;
                return this.result.length > 0 ? `(${this.result.length})` : null;
            }
        },
        methods: {
            getCollectionCourse() {
                getCollection().then(res => {
                    if (res) {
                        this.list = res.courses;
                        this.show = true;
                        Toast.clear();
                        if (this.list.length > 0) this.$emit('setNavBarRight', {
                            show: true,
                            text: '管理',
                            funcName: 'titleRightSet'
                        });
                    }
                });
            },
            titleRightSet() {
                this.titleSet = false;
                this.isSelectAll = false;
                this.$emit('setNavBarRight', {show: true, text: '取消', funcName: 'titleRightCancel'});
            },
            titleRightCancel() {
                this.titleSet = true;
                this.isSelectAll = false;
                this.result = [];
                this.$emit('setNavBarRight', {show: true, text: '管理', funcName: 'titleRightSet'});
            },
            toggle(index) {
                if (this.titleSet) {
                    this.$router.push({name: 'course-study', params: {id: this.list[index]['courseID']}})
                } else this.$refs.checkboxes[index].toggle();
            },
            selectAll() {
                this.isSelectAll = !this.isSelectAll;
                if (this.isSelectAll) {
                    this.$refs.checkboxGroup.toggleAll(true);
                } else {
                    this.$refs.checkboxGroup.toggleAll();
                }
            },
            deleteCollection() {
                let data;
                if (this.result.length === this.list.length) data = {list: 'all'};
                else data = {list: this.result};
                this.result = [];
                deleteCollection(data).then(async res => {
                    if (res) {
                        res = await getCollection();
                        if (res) {
                            this.list = res.courses;
                            if (this.list.length === 0) {
                                this.titleSet = true;
                                this.$emit('setNavBarRight', {show: false});
                            }
                        }
                    }
                })
            }
        },
        created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.getCollectionCourse();
        }
    }
</script>

<style lang="less">
    .user-collection {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;

        .collection-cell {
            .van-col {
                height: 68px;
            }

            img {
                width: 120px;
                height: 100%;
            }

            .course-name {
                min-height: 40px;
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

            .free {
                color: #42c02e;
            }

            .course-apply {
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
            height: 52px;

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

    .user-collection-selected {
        height: calc(100vh - 98px);
    }
</style>
