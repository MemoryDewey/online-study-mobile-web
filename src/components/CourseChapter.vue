<template>
    <div class="course-study-chapter" v-if="loadFinish">
        <div class="chapter-header">
            <span>授课方式：</span>
            <span v-if="live"><svg-icon class="header-icon" data="@icon/live.svg"></svg-icon>直播</span>
            <span><svg-icon class="header-icon" data="@icon/video.svg"></svg-icon>视频（{{videoNum}}）</span>
        </div>
        <collapse v-model="showName" accordion>
            <collapse-item v-for="chapter in chapters" :key="chapter.number"
                           :name="chapter.number" :title="chapter.name">
                <cell v-for="video in chapter.video" :key="video.id" class="van-ellipsis"
                      :title="video.name" :label="`${video.duration}分钟`" :border="false" clickable>
                    <svg-icon class="video-icon" slot="icon" data="@icon/video.svg"></svg-icon>
                </cell>
            </collapse-item>
        </collapse>
    </div>
</template>

<script>
    import {Collapse, CollapseItem, Cell} from 'vant'
    import {getLive, getVideo} from '@/api/course'

    export default {
        name: "CourseChapter",
        components: {Collapse, CollapseItem, Cell},
        props: {
            live: {type: Boolean, required: true}
        },
        data() {
            return {
                chapters: [],
                loadFinish: false,
                showName: '',
                videoNum: 0
            }
        },
        created() {
            getVideo({courseID: this.$route.params.id}).then(res => {
                this.chapters = res.data;
                this.videoNum = res.count;
                this.loadFinish = true;
            });
        }
    }
</script>

<style lang="less">
    .course-study-chapter {
        span {
            display: inline-block;
            box-sizing: border-box;
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
