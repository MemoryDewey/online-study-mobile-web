<template>
    <div class="course-card">
        <div class="card-left">
            <div class="card-image">
                <img v-lazy="image" alt>
            </div>
        </div>
        <div class="card-right">
            <div class="card-title card-ellipsis">
                <span>{{title}}</span>
            </div>
            <div class="card-desc card-ellipsis">
                {{desc}}
            </div>
            <div class="card-bottom">
                <span class="info">{{sales}}人购买|好评{{rate}}%</span>
                <span v-if="price > 0" class="price" style="color: #ee0a24;">￥{{price}}</span>
                <span v-else class="price" style="color: #42c02e;">免费</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseCard",
        props: {
            image: String,
            title: String,
            desc: String,
            sales: [Number, String],
            rate: [Number, String],
            price: [Number, String]
        }
    }
</script>

<style lang="less">
    .course-card {
        position: relative;
        padding: 0.75vh 0;

        &:after {
            clear: both;
            content: "";
            display: table;
        }

        .card-left {
            position: relative;
            flex: none;
            width: 33.6vw;
            height: calc(33.6vw * 9 / 16);
            float: left;

            .card-image {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 3px;
                }
            }
        }

        .card-right {
            position: relative;
            flex: none;
            width: 60.4vw;
            float: right;

            .card-ellipsis {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .card-title {
                margin: 0 0 1vh 2vw;
                font-weight: 500;
                line-height: 2vh;
                font-size: 2vh;
                color: #333;
                vertical-align: middle;
            }

            .card-desc {
                margin: 0 0 1vh 2vw;
                line-height: 1.8vh;
                font-size: 1.8vh;
                color: #666;
                vertical-align: middle;
            }

            .card-bottom {
                margin: 0 0 1vh 2vw;

                .info {
                    color: #999;
                    font-size: 1.5vh;
                    float: left;
                }

                .price {
                    font-size: 1.6vh;
                    float: right;
                }
            }
        }

    }
</style>
