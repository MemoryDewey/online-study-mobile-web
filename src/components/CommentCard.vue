<template>
    <div class="comment-card">
        <img :src="getImageUrl(avatar)" alt>
        <div class="comment-content">
            <div class="top">
                <a class="van-ellipsis">{{nickname}}</a>
                <rate v-model="rate" redonly color="#ffae05"></rate>
            </div>
            <p>{{content}}</p>
            <div class="time">{{time}}</div>
        </div>
    </div>
</template>

<script>
    import {Rate} from 'vant'
    import {getImageUrl} from "@/utils/image"

    export default {
        name: "CommentCard",
        components: {Rate},
        props: {
            avatar: String,
            nickname: String,
            rate: Number,
            content: String,
            time: String
        },
        data(){
            return{
                getImageUrl
            }
        }
    }
</script>

<style lang="less">
    .comment-card {
        display: flex;
        display: -webkit-flex;
        padding: 8px 16px;
        border-bottom: 1px solid #ebedf0;
        height: 110px;


        img {
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            width: 32px;
            height: 32px;
            margin-right: 16px;
            border: 1px solid #ddd;
            border-radius: 50%;
        }

        .comment-content {
            padding-top: 6px;

            .top {
                line-height: 20px;
                display: inline-block;
            }

            .time {
                margin: 10px 0 0;
                line-height: 20px;
                color: #7d7e80;
            }

            a {
                margin: 0;
                font-size: 18px;
                font-weight: bold;
                max-width: 100px;
                display: inline-block;
                padding-right: 20px;
            }

            p {
                margin: 10px 0 0;
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
</style>
