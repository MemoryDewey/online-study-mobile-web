<template>
    <div class="course">
        <div class="head-search">
            <search placeholder="请输入课程关键词"></search>
        </div>
        <main>
            <dropdown-menu :duration="0.4">
                <dropdown-item v-model="sortValue" :options="sortOptions"></dropdown-item>
                <dropdown-item title="全部分类" ref="classItem">
                    <tree-select :items="items" :active-id.sync="activeId"
                                 :main-active-index.sync="activeIndex"></tree-select>
                </dropdown-item>
                <dropdown-item v-model="filterValue" :options="filterOptions"></dropdown-item>
            </dropdown-menu>
        </main>
        <section>

        </section>
    </div>
</template>

<script>
    import {Search, DropdownMenu, DropdownItem, TreeSelect} from 'vant'

    export default {
        name: "Course",
        components: {Search, DropdownMenu, DropdownItem, TreeSelect},
        data() {
            return {
                sortValue: 0,
                sortOptions: [
                    {text: '默认排序', value: 0},
                    {text: '好评最高', value: 1},
                    {text: '人气最高', value: 2},
                    {text: '价格最高', value: 3},
                    {text: '价格最低', value: 4}
                ],
                filterValue: 0,
                filterOptions: [
                    {text: '课程类型', value: 0},
                    {text: '免费课程', value: 1},
                    {text: '付费课程', value: 2},
                    {text: '录播课程', value: 3},
                    {text: '直播课程', value: 4}
                ],
                activeId: 1,
                activeIndex: 0,
                items: [
                    {
                        // 导航名称
                        text: '所有城市',
                        // 导航名称右上角徽标
                        info: 3,
                        // 是否在导航名称右上角显示小红点
                        dot: true,
                        // 该导航下所有的可选项
                        children: [
                            {
                                // 名称
                                text: '温州',
                                // id，作为匹配选中状态的标识符
                                id: 1,
                                // 禁用选项
                                disabled: true
                            },
                            {
                                text: '杭州',
                                id: 2
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    .course {
        @head-height: 54px;

        .head-search {
            top: 0;
            left: 0;
            width: 100%;
            line-height: @head-height;
            height: @head-height;
            text-align: center;
            z-index: 1;
            position: fixed;
        }

        main {
            margin-top: @head-height;
        }
    }
</style>
