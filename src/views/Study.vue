<template>
    <div id="course-study">
        <nav-bar class="study-head" fixed left-arrow :border="false" @click-left="routerGo">
            <icon slot="right" name="star-o"></icon>
        </nav-bar>
        <course-video></course-video>
        <sticky>
            <tabs color="#1989fa" title-active-color="#1989fa">
                <tab title="详情">
                    <course-detail></course-detail>
                </tab>
                <tab title="目录">

                </tab>
                <tab title="评论">

                </tab>
            </tabs>
        </sticky>
    </div>
</template>

<script>
    import {Sticky, NavBar, Icon, Tabs, Tab} from 'vant'
    import CourseVideo from '@/components/CourseVideo'
    import CourseDetail from '@/components/CourseDetail'

    export default {
        name: "index",
        components: {
            CourseDetail,
            Sticky, Icon, NavBar, Tabs, Tab,
            CourseVideo
        },
        methods: {
            routerGo() {
                this.$router.go(-1);
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
            background: rgba(0, 0, 0, 0.3);

            .van-icon {
                color: #fff;
            }
        }
    }
</style>
