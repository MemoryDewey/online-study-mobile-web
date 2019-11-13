<template>
    <div class="course-study-video" ref="courseVideo">
        <player v-if="videoExist" :src="src" :live="live"></player>
        <div v-else class="video-not-exist">
            <van-tag round type="primary" plain size="large">请在目录下选择视频学习</van-tag>
        </div>
    </div>
</template>

<script>
    import {Tag} from 'vant'
    import Player from '@/components/Player'
    import {getImageUrl} from '@/utils/url'
    import {mapGetters} from 'vuex';

    export default {
        name: "CourseVideo",
        components: {Player, 'van-tag': Tag},
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
