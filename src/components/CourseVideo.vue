<template>
    <div class="course-study-video">
        <video-player :options="options"></video-player>
    </div>
</template>

<script>
    import VideoPlayer from '@/components/VideoPlayer';

    export default {
        name: "CourseVideo",
        components: {VideoPlayer},
        data() {
            return {
                options: {
                    sources: {
                        type: "application/x-mpegURL",
                        src: ''
                    },
                    autoplay: false,
                    controls: true,
                    fill: true,
                    loop: false,
                    language: 'zh-CN',
                    liveui: 'true',
                    html5: true,
                    preload: 'metadata',
                    playbackRates: [],
                    notSupportedMessage: '该视频暂时无法播放'
                }
            }
        }
    }
</script>

<style lang="less">
    .course-study-video {
        width: 100vw;
        height: calc(100vw / 16 * 9);
        background-color: #000;
    }
</style>
