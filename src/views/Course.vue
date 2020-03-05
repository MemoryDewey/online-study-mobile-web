<template>
    <div class="course">
        <div class="head-search">
            <search v-model="searchValue" placeholder="请输入课程关键词"
                    @search="searchCourse"></search>
        </div>
        <main>
            <sticky>
                <dropdown-menu :duration="0.4">
                    <dropdown-item v-model="sortValue" :options="sortOptions" @change="sortChange"></dropdown-item>
                    <dropdown-item :title="treeTitle" ref="item" @close="dropdownClose">
                        <tree-select :items="items" :active-id.sync="activeId" :main-active-index.sync="activeIndex"
                                     @click-nav="systemChange" @click-item="typeChange" height="200"></tree-select>
                    </dropdown-item>
                    <dropdown-item v-model="filterValue" :options="filterOptions"
                                   @change="filterChange"></dropdown-item>
                </dropdown-menu>
            </sticky>
            <notice-bar v-if="this.$route.query.search" color="#1989fa" background="#ecf9ff" left-icon="info-o">
                共找到{{searchCount}}门与"{{$route.query.search}}"相关课程
            </notice-bar>
            <keep-alive>
                <section>
                    <pull-refresh v-model="refreshLoading" @refresh="onRefresh">
                        <list v-model="loading" error-text="请求失败，点击重新加载" finished-text="已经到底啦"
                              :error.sync="error" :finished="finished" @load="listOnload" :immediate-check="false">
                            <ul class="course-list">
                                <li v-for="course in courses" :key="course.id">
                                    <course-card-col :title="course.name" :id="course.id"
                                                     :desc="course.description" :price="course.price"
                                                     :rate="course.rate" :sales="course['apply']"
                                                     :image="course.image" :discount="!!course.discount">
                                    </course-card-col>
                                </li>
                            </ul>
                        </list>
                    </pull-refresh>
                </section>
            </keep-alive>
        </main>
    </div>
</template>

<script>
    import {Search, DropdownMenu, DropdownItem, TreeSelect, List, Sticky, PullRefresh, NoticeBar, Toast} from 'vant'
    import CourseCardCol from "@/components/CourseCardCol";
    import {getCourseSystemType, getList, getListPage} from "@/api/course";

    export default {
        name: "Course",
        components: {
            Search, DropdownMenu, DropdownItem, TreeSelect,
            List, Sticky, PullRefresh, NoticeBar,
            CourseCardCol
        },
        data() {
            return {
                sortValue: '0',
                sortOptions: [
                    {text: '默认排序', value: '0'},
                    {text: '好评最高', value: '1'},
                    {text: '人气最高', value: '2'},
                    {text: '价格最高', value: '3'},
                    {text: '价格最低', value: '4'}
                ],
                filterValue: '0',
                filterOptions: [
                    {text: '课程类型', value: '0'},
                    {text: '免费课程', value: '1'},
                    {text: '付费课程', value: '2'},
                    {text: '录播课程', value: '3'},
                    {text: '直播课程', value: '4'}
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
                type: null,
                courses: [],
                loading: false,
                error: false,
                finished: false,
                page: 1,
                loadingTimes: 1,
                refreshLoading: false,
                searchValue: null,
                searchCount: 0,
                height: 0
            }
        },
        methods: {
            systemChange(index) {
                this.system = {id: this.items[index].id, name: this.items[index].text};
            },
            typeChange(data) {
                this.type = data.id;
                this.treeTitle = data.text;
                this.$refs.item.toggle();
                if (this.type !== 0) {
                    this.$router.replace({
                        path: this.$route.fullPath,
                        query: {system: this.items[this.activeIndex].id, type: this.type},
                    });
                } else {
                    this.$router.replace({
                        path: this.$route.fullPath,
                        query: {
                            system: this.activeIndex !== 0 ? this.items[this.activeIndex].id : undefined,
                            type: undefined
                        },
                    });
                }
            },
            dropdownClose() {
                if (!this.type) {
                    if (this.system.name) this.treeTitle = this.system.name;
                    this.$router.replace({
                        path: this.$route.fullPath,
                        query: {
                            system: (this.system.id && this.system.id !== 0) ? this.system.id : undefined,
                            type: undefined
                        }
                    });
                }
            },
            sortChange(value) {
                this.$router.push({path: this.$route.fullPath, query: {sort: value !== '0' ? value : undefined}});
            },
            filterChange(value) {
                this.$router.replace({path: this.$route.fullPath, query: {filter: value !== '0' ? value : undefined}});
            },
            listOnload() {
                setTimeout(() => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        this.getCourse();
                    }
                }, 500);
            },
            getTreeTitle(sid, tid) {
                const system = this.items.find(temp => {
                    return temp.id === sid;
                });
                const type = system.children.find(temp => {
                    return temp.id === tid;
                });
                this.treeTitle = type ? type.text : system.text;
            },
            searchCourse(value) {
                this.$router.replace({path: this.$route.fullPath, query: {search: value}});
            },
            async onRefresh() {
                await this.courseChange();
                this.refreshLoading = false;
            },
            async getSystemType() {
                const res = await getCourseSystemType();
                if (res) {
                    for (let system of res.data) {
                        let children = [];
                        for (let type of system.types) {
                            children.push({
                                id: type.id,
                                text: type.name
                            })
                        }
                        this.items.push({
                            id: system.id,
                            text: system.name,
                            children
                        })
                    }
                }
            },
            async getCourse() {
                this.$route.query.page = this.loadingTimes;
                const res = await getList(this.$route.query);
                if (res) {
                    this.loading = false;
                    for (let course of res['course']) {
                        this.courses.push(course);
                    }
                    this.loadingTimes++;
                } else this.error = true;
            },
            async getPage() {
                const res = await getListPage(this.$route.query);
                if (res) {
                    this.page = res.page;
                    if (this.$route.query.search) this.searchCount = res.count;
                }
            },
            async courseChange() {
                this.courses = [];
                this.loading = false;
                this.error = false;
                this.loadingTimes = 1;
                if (!this.finished) {
                    this.listOnload();
                } else this.finished = false;
                await this.getPage();
            }
        },
        beforeCreate() {
            this.$emit('setTab', true);
        },
        async created() {
            this.height = window.innerHeight;
            window.onresize = () => {
                if (window.innerHeight < this.height) {
                    this.$emit('setTab', false);
                } else {
                    this.$emit('setTab', true);
                }
            };
            await this.getSystemType();
            this.sortValue = this.$route.query.sort ? this.$route.query.sort : '0';
            this.filterValue = this.$route.query.filter ? this.$route.query.filter : '0';
            this.activeIndex = this.$route.query.system ? parseInt(this.$route.query.system.toString()) : 0;
            this.activeId = this.$route.query.type ? parseInt(this.$route.query.type.toString()) : 0;
            this.getTreeTitle(this.activeIndex, this.activeId);
            await this.getPage();
            this.listOnload();
        },
        watch: {
            async '$route.query'() {
                await this.courseChange();
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
            position: relative;
            overflow: auto;
            height: calc(100vh - 54px);

            section {
                padding: 0 10px 50px;

                .course-list {
                    list-style: none;
                }
            }
        }
    }
</style>
