<template>
    <div id="vue-video-js">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    import {mapGetters} from 'vuex';

    export default {
        name: "VideoPlayer",
        props: {
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                player: null
            }
        },
        mounted() {
            this.player = videojs(this.$refs.videoPlayer, this.options);
            console.log(this.player)
        },
        computed: {
            ...mapGetters(["getIsLive", "getVideoUrl"])
        },
        watch: {
            getVideoUrl(val) {
                this.player.reset();
                this.player.src(val);
            },
            getIsLive(val) {
                if (val) {
                    this.player.options_.playbackRates = [];
                    this.player.options_.notSupportedMessage = '直播暂未开始';
                } else {
                    this.player.options_.playbackRates = [0.5, 1, 1.5, 2];
                    this.player.options_.notSupportedMessage = '该视频暂时无法播放';
                }
            }
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        }
    }
</script>

<style lang="less">
    #vue-video-js {
        width: 100%;
        height: 100%;

        .vjs-big-play-button {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
</style>
