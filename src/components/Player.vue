<template>
    <div id="vue-player">
        <video ref="player" playsinline controls/>
    </div>
</template>

<script>
    import Player from 'plyr'
    import Hls from 'hls.js'
    import 'plyr/dist/plyr.css'

    export default {
        name: "Player",
        props: {
            src: {type: String, required: true},
            live: {type: Boolean, default: false}
        },
        data() {
            return {
                player: null,
                hls: null
            }
        },
        methods: {
            playOrPause() {
                this.player.togglePlay();
            }
        },
        mounted() {
            this.hls = new Hls();
            this.player = new Player(this.$refs['player'], {
                speed: {selected: 1, options: [0.5, 1, 2]},
                i18n: {
                    speed: '播放速度',
                    normal: '正常'
                },
                controls: [
                    'play-large', // The large play button in the center
                    'play', // Play/pause playback
                    'progress', // The progress bar and scrubber for playback and buffering
                    'current-time', // The current time of playback
                    'duration', // The full duration of the media
                    'settings', // Settings menu
                    'volume',
                    'fullscreen', // Toggle fullscreen
                ],
            });
            if (this.live) {
                this.hls.loadSource(this.src);
                this.hls.attachMedia(this.$refs['player'])
            } else this.player.source = {
                type: 'video',
                sources: [{
                    src: this.src
                }]
            };
            this.player.on('enterfullscreen', event => {
                document.getElementsByClassName("plyr__volume")[0].hidden = false;
            });
            this.player.on('exitfullscreen', event => {
                document.getElementsByClassName("plyr__volume")[0].hidden = true;
            });
        },
        watch: {
            src(val) {
                console.log(val)
                if (this.live) {
                    this.hls.loadSource(src);
                    this.hls.attachMedia(this.$refs['player'])
                } else this.player.source = {
                    type: 'video',
                    sources: [{
                        src: val
                    }]
                };
            }
        },
        beforeDestroy() {
            if (this.player) {
                this.hls.destroy();
                this.player.destroy();
            }
        }
    }
</script>

<style lang="less">
    #vue-player {
        width: 100%;
        height: 100%;

        .plyr--video {
            height: 100%;
        }

        .plyr__time {
            display: block;
        }
    }
</style>
