<template>
    <div class="course-card-row">
        <div class="card-image">
            <img src="/images/course-cover/f812dd0f071a38ecd64d6153167cac0d.jpeg" alt>
        </div>
        <div class="card-content">
            <div class="card-title">
                <span>区块链课程源代码分析源代码分析源代码分析代码分析</span>
            </div>
            <div class="card-info">
                <div class="card-price">
                    <div class="card-price">￥311.00<span class="card-tag">限时优惠</span></div>
                    <div class="card-origin-price">￥356.00<span style="float: right">0人已抢</span></div>
                </div>
            </div>
            <div class="card-bottom">
                <van-button type="warning" size="small">马上抢</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tag, Button} from 'vant'

    export default {
        name: "CourseCardRow",
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
