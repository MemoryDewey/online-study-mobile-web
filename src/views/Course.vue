<template>
    <div class="course">
        <div class="head-search">
            <search placeholder="请输入课程关键词"></search>
        </div>
        <main>
            <dropdown-menu :duration="0.4">
                <dropdown-item v-model="sortValue" :options="sortOptions"></dropdown-item>
                <dropdown-item :title="treeTitle" ref="item" @close="dropdownClose">
                    <tree-select :items="items" :active-id.sync="activeId" :main-active-index.sync="activeIndex"
                                 @click-nav="systemChange" @click-item="typeChange"></tree-select>
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
    import {getCourseSystemType} from "@/api/course";

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
                treeTitle: '全部分类',
                activeId: 0,
                activeIndex: 0,
                items: [
                    {
                        text: '全部分类',
                        id: 0,
                        children: [{
                            id: 0,
                            text: '全部分类'
                        }]
                    }
                ],
                system: {},
                type: null
            }
        },
        methods: {
            async getSystemType() {
                const res = await getCourseSystemType();
                if (res) {
                    for (let system of res.data) {
                        let children = [];
                        for (let type of system['CourseTypes']) {
                            children.push({
                                id: type['typeID'],
                                text: type['typeName']
                            })
                        }
                        this.items.push({
                            id: system['systemID'],
                            text: system['systemName'],
                            children
                        })
                    }
                }
            },
            systemChange(index) {
                this.system = {id: this.items[index].id, name: this.items[index].text};
            },
            typeChange(data) {
                this.type = data.id;
                this.treeTitle = data.text;
                this.$refs.item.toggle();
            },
            dropdownClose() {
                if (!this.type) {
                    if (this.system.name) this.treeTitle = this.system.name;
                }
            }
        },
        created() {
            this.getSystemType();
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
