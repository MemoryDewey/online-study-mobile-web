<template>
    <div class="course-card-row">
        <div class="card-image">
            <img v-lazy="getImageUrl(image)" alt>
        </div>
        <div class="card-content">
            <div class="card-title">
                <span>{{title}}</span>
            </div>
            <div class="card-info">
                <van-row class="card-price">
                    <van-col span="3">
                        <svg-icon data="@icon/coin.svg" class="card-svg-icon" color="#ee0c24"></svg-icon>
                    </van-col>
                    <van-col span="10">{{price}}</van-col>
                    <van-col span="11"><span class="card-tag">{{tag}}</span></van-col>
                </van-row>
                <van-row class="card-origin-price">
                    <van-col span="13"><span style="text-decoration: line-through">{{originPrice}} 课程币</span></van-col>
                    <van-col span="11"><span v-if="sales">{{sales}}人已抢</span></van-col>
                </van-row>
            </div>
            <div class="card-bottom">
                <van-button type="warning" size="small" @click="routerGo">{{bottom}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Button, Row, Col} from 'vant'
    import {getImageUrl} from '@/utils/image'

    export default {
        name: "CourseCardRow",
        props: {
            image: String,
            title: String,
            tag: String,
            price: [Number, String],
            originPrice: [Number, String],
            sales: [Number, String],
            bottom: String,
            id: [Number, String]
        },
        components: {
            'van-button': Button, 'van-row': Row, 'van-col': Col
        },
        data() {
            return {
                getImageUrl
            }
        },
        methods: {
            routerGo() {
                if (this.id) {
                    this.$router.push({name: 'course-study', params: {id: this.id.toString()}});
                }
            }
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
            height: 88px;
            padding: 4px 7px;

            .card-title {
                font-size: 13px;
                font-weight: 500;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            .card-info {
                font-size: 12px;

                &:after {
                    clear: both;
                    content: "";
                    display: table;
                }

                .card-svg-icon {
                    width: 12px;
                    height: 12px;
                }

                .card-price {
                    color: #ee0a24;
                    margin: 3.5px 0;
                }

                .card-tag {
                    padding: 1px 4px;
                    border: 1px solid;
                }

                .card-origin-price {
                    color: #7d7e80;
                    margin: 3.5px 0;
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
