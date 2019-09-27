<template>
    <div class="course-study-video" ref="courseVideo">
        <video-player v-if="videoExist" :src="src" :live="live"></video-player>
        <div v-else class="video-not-exist">
            <van-button round type="warning">{{buttonText}}</van-button>
        </div>
    </div>
</template>

<script>
    import {Button} from 'vant'
    import VideoPlayer from '@/components/VideoPlayer';
    import {getImageUrl} from '@/utils/image'
    import {mapGetters} from 'vuex';

    export default {
        name: "CourseVideo",
        components: {VideoPlayer, 'van-button': Button},
        props: {
            buttonText: String
        },
        data() {
            return {
                videoExist: false,
                src: null,
                live: false
            }
        },
        computed: {
            ...mapGetters(["getVideoUrl", "getCourseImage"])
        },
        watch: {
            getVideoUrl(val) {
                if (!!val) this.src = val;
                this.live = this.$store.state.isLive;
                this.videoExist = !!val;
            },
            getCourseImage(val) {
                this.$refs['courseVideo'].style.backgroundImage = `url(${getImageUrl(val)})`;
                this.$refs['courseVideo'].style.backgroundSize = 'cover';
            }
        },
    }
</script>

<style lang="less">
    .course-study-video {
        width: 100vw;
        height: calc(100vw / 16 * 9);
        background-color: #000;

        .video-not-exist {
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
        }
    }
</style>
