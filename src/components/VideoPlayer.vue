<template>
    <div id="vue-video-js">
        <video ref="videoPlayer" class="video-js" playsinline></video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'

    export default {
        name: "VideoPlayer",
        props: {
            src: {type: String, required: true},
            live: {type: Boolean, default: false}
        },
        data() {
            return {
                player: null,
                options: {
                    sources: {src: ''},
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
        },
        mounted() {
            this.options.sources.src = this.src;
            if (!this.live) this.options.playbackRates = [0.5, 1, 1.5, 2];
            else this.options.playbackRates = [];
            this.player = videojs(this.$refs.videoPlayer, this.options);
        },
        watch: {
            src(val) {
                this.player.reset();
                this.player.src(val);
                this.player.load(val);
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

        .vjs-paused .vjs-big-play-button {
            display: block;
        }

        .vjs-error .vjs-big-play-button {
            display: none;
        }

        .vjs-big-play-button {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            font-size: 2.5em;
            line-height: 2.3em;
            height: 2.5em;
            width: 2.5em;
            -webkit-border-radius: 2.5em;
            -moz-border-radius: 2.5em;
            border-radius: 2.5em;

            .vjs-icon-placeholder {
                font-size: 1.63em;
            }

            .vjs-loading-spinner {
                font-size: 2.5em;
                width: 2em;
                height: 2em;
                border-radius: 1em;
                margin-top: -1em;
                margin-left: -1.5em;
            }
        }

        .vjs-time-control {
            display: block;
        }

        .vjs-remaining-time {
            display: none;
        }

        .vjs-playing .vjs-tech {
            pointer-events: auto;
        }
    }
</style>
