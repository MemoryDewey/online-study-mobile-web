<template>
    <div class="course-study-detail" v-if="loadFinish">
        <div class="detail-cell">
            <div class="detail-title">
                <span>{{title}}</span>
            </div>
            <div class="detail-info">
                <span style="color:#dcbb70;font-size: 15px">{{price===0?'免费':`￥${price}`}}</span>
                <span>{{apply}} 人已报名</span>
                <span>好评 {{rate*100}}%</span>
            </div>
        </div>
        <div class="detail-cell">
            <div class="detail-title">
                <svg-icon class="detail-icon" data="@icon/detail.svg" color="#1989fa"></svg-icon>
                <span>课程详情</span>
            </div>
            <p>{{content}}</p>
        </div>
        <div class="detail-cell">
            <div class="detail-title">
                <svg-icon class="detail-icon" data="@icon/target.svg" color="#1989fa"></svg-icon>
                <span>课程目标</span>
            </div>
            <p>{{target}}</p>
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
    </div>
</template>

<script>
    import {Image} from 'vant'
    import {getInfo} from '@/api/course'
    import {getImageUrl} from '@/utils/image'

    export default {
        name: "CourseDetail",
        components: {'van-image': Image},
        props: {
            isApply: {type: Boolean, required: true}
        },
        data() {
            return {
                loadFinish: false,
                title: '',
                apply: 0,
                price: 0,
                rate: 0,
                content: '',
                target: '',
                teacherName: '',
                teacherAvatar: '',
                getImageUrl
            }
        },
        methods: {
            getDetail() {
                getInfo({courseID: this.$route.params.id}).then(res => {
                    if (res) {
                        this.title = res.course.info['courseName'];
                        this.price = res.course.info['price'];
                        this.rate = res.course.info['favorableRate'];
                        this.apply = res.course.info['applyCount'];
                        this.content = res.course.details['courseSummary'];
                        this.target = res.course.details['courseTarget'];
                        this.teacherAvatar = res.course.details['UserInformation'].avatarUrl;
                        this.teacherName = res.course.details['UserInformation'].nickname;
                        this.$store.commit('setCourseImage', res.course.info['courseImage']);
                        this.$emit('setCourse', {
                            live: res.course.info['courseForm'] === 'L',
                            text: res.course.info['price'] > 0 ? '立即购买' : '免费报名',
                            rate: res.course.info['favorableRate']
                        });
                        this.loadFinish = true;
                    }
                });
            }
        },
        created() {
            this.getDetail();
        },
        watch:{
            isApply(value){
                if(value)this.getDetail();
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
