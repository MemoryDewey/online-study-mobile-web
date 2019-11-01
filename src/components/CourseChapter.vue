<template>
    <div class="course-study-chapter">
        <skeleton title :row="8" :loading="!loadFinish"></skeleton>
        <template v-if="loadFinish">
            <div class="chapter-header">
                <span>授课方式：</span>
                <span v-if="live"><svg-icon class="header-icon" data="@icon/live.svg"></svg-icon>直播</span>
                <span><svg-icon class="header-icon" data="@icon/video.svg"></svg-icon>视频（{{videoNum}}）</span>
            </div>
            <collapse v-model="showName">
                <collapse-item v-if="live" name="live" title="直播课程">
                    <cell class="van-ellipsis" :title="liveInfo.live?liveInfo.title:'暂无直播'"
                          :label="liveInfo.live?liveInfo.state?'直播中':'未开播':'该课程暂无直播'"
                          :border="false" clickable @click="setLive">
                        <svg-icon class="video-icon" slot="icon" data="@icon/live.svg"></svg-icon>
                    </cell>
                </collapse-item>
                <collapse-item v-for="chapter in chapters" :key="chapter.number"
                               :name="chapter.number" :title="chapter.name">
                    <cell v-for="video in chapter.video" :key="video.id" class="van-ellipsis" :title="video.name"
                          :label="`${video.duration}分钟`" :border="false" clickable @click="setVideo(video.url)">
                        <svg-icon class="video-icon" slot="icon" data="@icon/video.svg"></svg-icon>
                    </cell>
                </collapse-item>
            </collapse>
        </template>
    </div>
</template>

<script>
    import {Collapse, CollapseItem, Cell, Skeleton, Toast} from 'vant'
    import {getLive, getVideo} from '@/api/course'

    export default {
        name: "CourseChapter",
        components: {Collapse, CollapseItem, Cell, Skeleton},
        props: {
            live: {type: Boolean, required: true},
            isApply: {type: Boolean, required: true}
        },
        data() {
            return {
                chapters: [],
                loadFinish: false,
                showName: [],
                videoNum: 0,
                liveInfo: {live: false, streamName: null, state: false, title: null}
            }
        },
        watch:{
            isApply(){
                this.getChapter();
            }
        },
        methods: {
            setLive() {
                if (!this.isApply) {
                    Toast.fail('请先报名该课程');
                } else this.$store.commit('changeVideo', {
                    isLive: true,
                    videoUrl: this.liveInfo.state ? this.liveInfo.streamName : null
                })
            },
            setVideo(url) {
                if (!this.isApply) {
                    Toast.fail('请先报名该课程');
                } else this.$store.commit('changeVideo', {
                    isLive: false, videoUrl: url
                })
            },
            getChapter(){
                getVideo({courseID: this.$route.params.id}).then(res => {
                    this.chapters = res.data;
                    this.videoNum = res.count;
                    this.loadFinish = true;
                });
                if (this.live) {
                    getLive({courseID: this.$route.params.id}).then(res => {
                        this.liveInfo.state = res.state;
                        this.liveInfo.live = res.live;
                        this.liveInfo.streamName = res.streamName;
                        this.liveInfo.title = res.title;
                    });
                }
            }
        },
        created() {
            this.getChapter();
        }
    }
</script>

<style lang="less">
    .course-study-chapter {
        span {
            display: inline-block;
            box-sizing: border-box;
        }

        .van-skeleton__title, .van-skeleton__row {
            height: 24px;
        }

        .van-skeleton__title {
            margin-top: 10px;
        }

        .van-skeleton__row {
            margin-top: 20px;
        }

        .chapter-header {
            height: 20px;
            padding: 10px 16px;
            border-bottom: 10px solid #f6f6f6;

            span {
                padding-right: 15px;
            }

            .header-icon {
                height: 15px;
                width: 15px;
                padding-right: 3px;
                vertical-align: middle;
            }
        }

        .van-collapse-item__content {
            padding: 10px 16px;

            .van-cell {
                padding: 5px 0;
            }
        }

        .video-icon {
            height: 25px;
            width: 25px;
            padding-right: 5px;
            vertical-align: middle;
        }
    }
</style>
