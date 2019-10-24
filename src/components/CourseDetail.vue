<template>
    <div class="course-study-detail" v-if="loadFinish">
        <div class="detail-cell">
            <div class="detail-title">
                <span>{{title}}</span>
            </div>
            <div class="detail-info">
                <span v-if="!isDiscount" class="price">{{price===0?'免费':`${price} 课程币`}}</span>
                <span>{{apply}} 人已报名</span>
                <span>好评 {{rate*100}}%</span>
            </div>
            <div class="detail-discount" v-if="checkDiscountTime(discountTime)">
                <span class="discount-price">{{discountPrice}}币 <span class="old-price">{{price}}币</span></span>
                <count-down :time="time">
                    <template v-slot="timeData">
                        <span>据结束 {{ timeData.days }}天 </span>
                        <span class="item">{{ formatDiscountTime(timeData.hours) }}</span>:
                        <span class="item">{{ formatDiscountTime(timeData.minutes) }}</span>:
                        <span class="item">{{ formatDiscountTime(timeData.seconds) }}</span>
                    </template>
                </count-down>
            </div>
        </div>
        <div class="detail-cell" style="border: 0">
            <div class="detail-title">
                <svg-icon class="detail-icon" data="@icon/mechanism.svg" color="#1989fa"></svg-icon>
                <span>授课教师</span>
            </div>
            <div class="teacher-info">
                <div class="teacher-avatar">
                    <van-image :src="getImageUrl(teacherAvatar)"></van-image>
                </div>
                <div class="teacher-info-text">
                    <div>{{teacherName}}</div>
                </div>
            </div>
        </div>
        <div class="detail-cell">
            <div class="detail-title">
                <svg-icon class="detail-icon" data="@icon/detail.svg" color="#1989fa"></svg-icon>
                <span>课程详情</span>
            </div>
            <p>{{content}}</p>
            <img v-if="detailCover" class="detail-image" v-lazy="getImageUrl(detailCover)" alt>
        </div>
    </div>
</template>

<script>
    import {Image, CountDown, Col, Row} from 'vant'
    import {getInfo} from '@/api/course'
    import {getImageUrl} from '@/utils/image'

    export default {
        name: "CourseDetail",
        components: {'van-image': Image, CountDown, 'van-col': Col, 'van-row': Row},
        props: {
            isApply: {type: Boolean, required: true}
        },
        data() {
            return {
                isCreate: true,
                loadFinish: false,
                title: '',
                apply: 0,
                price: 0,
                rate: 0,
                content: '',
                detailCover: '',
                isDiscount: false,
                time: 0,
                discountTime: 0,
                discount: 100,
                discountPrice: 0,
                teacherName: '',
                teacherAvatar: '',
                getImageUrl
            }
        },
        methods: {
            getDetail() {
                getInfo({courseID: this.$route.params.id}).then(res => {
                    if (res) {
                        this.title = res['course'].info['courseName'];
                        this.price = res['course'].info['price'];
                        this.rate = res['course'].info['favorableRate'];
                        this.apply = res['course'].info['applyCount'];
                        this.content = res['course'].details['detail'];
                        this.detailCover = res['course'].details['coverUrl'];
                        this.discountTime = res['course'].info.discountTime;
                        this.discount = res['course'].info.discount;
                        this.teacherAvatar = res['course'].details['UserInformation'].avatarUrl;
                        this.teacherName = res['course'].details['UserInformation'].nickname;
                        this.$store.commit('setCourseImage', res['course'].info['courseImage']);
                        this.$emit('setCourse', {
                            live: res['course'].info['courseForm'] === 'L',
                            text: res['course'].info['price'] > 0 ? '立即购买' : '免费报名',
                            rate: res['course'].info['favorableRate'],
                            collection: res.collection
                        });
                        this.loadFinish = true;
                    }
                });
            },
            checkDiscountTime(time) {
                if (time === null) {
                    this.isDiscount = false;
                    return false;
                }
                let subTime = new Date(time).getTime() - new Date().getTime();
                this.isDiscount = subTime > 0;
                if (this.isDiscount) {
                    this.discountPrice = (this.price * this.discount / 100).toFixed(2);
                    this.time = subTime;
                }
                return this.isDiscount;
            },
            formatDiscountTime(time) {
                if (time < 10) return '0' + time.toString();
                return time;
            }
        },
        created() {
            this.getDetail();
            this.isCreate = true;
        },
        watch: {
            isApply(value) {
                if (value && !this.isCreate) this.getDetail();
            }
        }
    }
</script>

<style lang="less">
    .course-study-detail {
        .detail-cell {
            padding: 12px 16px;
            border-bottom: 1px solid #ebedf0;
        }

        .detail-title {
            font-size: 18px;
        }

        .detail-info {
            padding-top: 12px;

            span {
                padding-right: 15px;
            }

            .price {
                color: #dcbb70;
                font-size: 15px
            }
        }

        .detail-discount {
            height: 48px;
            margin-top: 12px;
            background-color: #ff4343;
            color: #fff;
            padding: 0 10px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            align-items: center;
            -webkit-align-items: center;

            .van-count-down {
                color: #fff;
                font-size: 12px;
                display: inline-block;

                .item {
                    display: inline-block;
                    width: 22px;
                    margin-right: 5px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    background-color: #db2d20;
                }
            }

            .discount-price {
                font-size: 16px;
                margin-right: 10px;
            }

            .old-price {
                font-size: 14px;
                text-decoration: line-through;
            }
        }

        .detail-image {
            width: 100%;
        }

        .detail-icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            vertical-align: middle;
        }

        .teacher-info {
            margin-top: 12px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            height: 45px;
        }

        .teacher-avatar {
            width: 45px;
            background-color: #f6f6f6;

            .van-image {
                width: 35px;
                height: 35px;
                padding: 5px;
            }
        }

        .teacher-info-text {
            padding: 0 10px;
            font-size: 16px;
            line-height: 16px;
        }
    }
</style>
