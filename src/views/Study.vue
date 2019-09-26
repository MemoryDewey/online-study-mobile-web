<template>
    <div id="course-study">
        <nav-bar class="study-head" fixed left-arrow :border="false" @click-left="routerGo">
            <icon slot="right" name="star-o"></icon>
        </nav-bar>
        <course-video></course-video>
        <tabs color="#1989fa" title-active-color="#1989fa" sticky animated swipeable>
            <tab title="详情">
                <course-detail @setCourseType="setCourseType"></course-detail>
            </tab>
            <tab title="目录">
                <course-chapter :live="live"></course-chapter>
            </tab>
            <tab title="评论">

            </tab>
        </tabs>
        <tabbar fixed>
            <tabbar-item style="background-color: #1989fa">
                <span class="bottom-btn-text">免费报名</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {NavBar, Icon, Tabs, Tab, Tabbar, TabbarItem, Button} from 'vant'
    import CourseVideo from '@/components/CourseVideo'
    import CourseDetail from '@/components/CourseDetail'
    import CourseChapter from '@/components/CourseChapter'

    export default {
        name: "index",
        components: {
            CourseChapter,
            CourseDetail, CourseVideo,
            Icon, NavBar, Tabs, Tab, Tabbar, TabbarItem, 'van-button': Button,
        },
        data() {
            return {
                live: true
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1);
            },
            setCourseType(val) {
                this.live = val;
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
    }
</script>

<style lang="less">
    #course-study {
        .study-head {
            background: rgba(0, 0, 0, 0);

            .van-icon {
                color: #fff;
            }
        }

        .van-tab__pane {
            height: calc(100vh - 305px);
            overflow: hidden;
            position: relative;

            > div {
                &:first-child {
                    height: 100%;
                    overflow-y: auto;
                    position: relative;
                }
            }
        }

        .bottom-btn-text {
            font-size: 16px;
            color: #fff;
        }
    }
</style>
