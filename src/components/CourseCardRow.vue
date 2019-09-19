<template>
    <div class="course-card-row">
        <div class="card-image">
            <img v-lazy="image" alt>
        </div>
        <div class="card-content">
            <div class="card-title">
                <span>{{title}}</span>
            </div>
            <div class="card-info">
                <div class="card-price">
                    <div class="card-price">￥{{price}}<span class="card-tag">{{tag}}</span></div>
                    <div class="card-origin-price">
                        ￥{{originPrice}}<span style="float: right" v-if="sales">{{sales}}人已抢</span>
                    </div>
                </div>
            </div>
            <div class="card-bottom">
                <van-button type="warning" size="small">{{bottom}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tag, Button} from 'vant'

    export default {
        name: "CourseCardRow",
        props: {
            image: String,
            title: String,
            tag: String,
            price: [Number, String],
            originPrice: [Number, String],
            sales: [Number, String],
            bottom: String
        },
        components: {
            Tag, 'van-button': Button
        }
    }
</script>

<style lang="less">
    .course-card-row {
        @card-width: 35.6vw;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        padding: 0;
        width: @card-width;

        .card-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .card-image {
            height: calc(@card-width / 16 * 9);

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .card-content {
            height: 15vh;
            padding: 0.5vh 1.5vw;

            .card-title {
                font-size: 1.8vh;
                font-weight: 500;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .card-info {
                font-size: 1.5vh;

                &:after {
                    clear: both;
                    content: "";
                    display: table;
                }

                .card-price {
                    color: #ee0a24;
                    margin: 0.5vh 0;
                }

                .card-tag {
                    padding: 0 0.5vw;
                    margin-left: 2vw;
                    border: 1px solid;
                }

                .card-origin-price {
                    color: #7d7e80;
                    text-align: left;
                    text-decoration: line-through;
                }
            }

            .card-bottom {
                button {
                    width: 100%;
                }

                text-align: center;
            }
        }
    }
</style>
