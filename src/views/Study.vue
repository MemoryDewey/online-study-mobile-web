<template>
    <div id="course-study">
        <nav-bar class="study-head-transparent" :title="headerShow?'课程详情':''"
                 ref="navBar" fixed :border="false" @click-left="routerGo" :z-index="100">
            <icon slot="left" name="arrow-left"></icon>
            <icon slot="right" name="star-o"></icon>
        </nav-bar>
        <div class="study-content">
            <course-video :button-text="bottomText"></course-video>
            <tabs color="#1989fa" title-active-color="#1989fa" @scroll="scroll" animated swipeable sticky>
                <tab title="详情">
                    <course-detail @setCourse="setCourse"></course-detail>
                </tab>
                <tab title="目录">
                    <course-chapter :live="live" :is-apply="isApply"></course-chapter>
                </tab>
                <tab title="评论">
                    <course-comment :rate="rate"></course-comment>
                </tab>
            </tabs>
            <tabbar fixed>
                <tabbar-item style="background-color: #1989fa" @click="applyCourse">
                    <span class="bottom-btn-text">{{bottomText}}</span>
                </tabbar-item>
            </tabbar>
        </div>
    </div>
</template>

<script>
    import {NavBar, Icon, Tabs, Tab, Tabbar, TabbarItem, Button} from 'vant'
    import CourseVideo from '@/components/CourseVideo'
    import CourseDetail from '@/components/CourseDetail'
    import CourseChapter from '@/components/CourseChapter'
    import CourseComment from '@/components/CourseComment'
    import {checkApply} from '@/api/course'

    export default {
        name: "index",
        components: {
            CourseChapter, CourseDetail, CourseVideo, CourseComment,
            Icon, NavBar, Tabs, Tab, Tabbar, TabbarItem, 'van-button': Button,
        },
        data() {
            return {
                live: true,
                free: true,
                bottomText: '',
                rate: 0,
                headerShow: false,
                isApply: false,
                isLogin: false
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1);
            },
            setCourse(val) {
                this.live = val.live;
                this.rate = val.rate;
                if (!this.isApply) this.bottomText = val.text;
                else this.bottomText = '开始上课';
            },
            scroll(val) {
                this.$nextTick(() => {
                    if (val.isFixed && !this.headerShow) {
                        this.$refs['navBar'].classList.replace('study-head-transparent', 'study-head-show');
                        this.headerShow = true;
                    } else if (!val.isFixed && this.headerShow) {
                        this.$refs['navBar'].classList.replace('study-head-show', 'study-head-transparent');
                        this.headerShow = false;
                    }
                });
            },
            async applyCourse() {
                if (!this.isLogin) {
                    await this.$router.push({name: 'login-phone', query: {origin: this.$route.path}});
                }
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
        created() {
            checkApply({courseID: this.$route.params.id}).then(res => {
                this.isApply = res.status === 1;
                this.isLogin = res.status !== 401;
            });
        },
        beforeRouteLeave(to, from, next) {
            if (this.edit) {
                this.edit = false;
                next(false);
            } else next();
        }
    }
</script>

<style lang="less">
    #course-study {
        overflow: hidden;
        position: relative;

        .study-head-transparent {
            background: rgba(255, 255, 255, 0);

            .van-icon {
                color: #fff;
            }
        }

        .study-head-show {
            background: rgba(255, 255, 255, 1);

            .van-icon {
                color: #1989fa;
            }
        }

        .study-content {
            height: calc(100vh - 50px);
            overflow-y: auto;
            position: relative;
        }

        .van-sticky--fixed {
            top: 45px;
        }

        .bottom-btn-text {
            font-size: 16px;
            color: #fff;
        }
    }
</style>
