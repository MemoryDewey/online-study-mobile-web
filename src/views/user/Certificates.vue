<template>
    <div class="course-manage">
        <notice-bar left-icon="volume-o" text="下载证书请前往PC端"/>
        <!--<div class="list-no-data">
            <svg-icon class="no-data-icon" data="@icon/page-null.svg" color="#999"/>
            <div class="no-data-text">暂无证书</div>
        </div>-->
        <van-list v-model="loading" finished-text="已经到底啦" :finished="finished"
                  @load="listOnload">
            <li class="tab-list-item" v-for="(certificate,index) in certificates"
                :key="index">
                <div class="tab-item-time">
                    <h3 class="tab-time">{{certificate['createdAt']}}</h3>
                </div>
                <router-link tag="div" class="tab-item-content"
                             :to="{name: 'course-study', params: {id: certificate['productID']}}">
                    <img class="tab-item-cover"
                         v-lazy="getImageUrl(certificate['CourseInformation']['courseImage'])"
                         alt>
                    <div class="tab-item-main">
                        <h2 class="tab-item-title">{{certificate['CourseInformation']['courseName']}}</h2>
                    </div>
                </router-link>
                <div class="tab-item-bottom">证书编号：{{certificate['id']}}</div>
            </li>
        </van-list>
    </div>
</template>

<script>
    import {Toast, NoticeBar, List} from 'vant';
    import {getImageUrl} from '@/utils/url';
    import {getCertificate} from "@/api/course";

    export default {
        name: "Certificates",
        components: {
            NoticeBar, "van-list": List,
        },
        data() {
            return {
                getImageUrl,
                show: false,
                loading: false,
                sum: 0,
                page: 1,
                loadingTimes: 1,
                finished: false,
                certificates: []
            }
        },
        methods: {
            async getCertificate(page) {
                let res = await getCertificate({page});
                if(res){
                    this.page = res['pageSum'];
                    this.loading = false;
                    for (let certificate of res['certificates']) {
                        this.certificates.push(certificate);
                    }
                    this.loadingTimes++;
                }
            },
            listOnload() {
                setTimeout(async () => {
                    if (this.loadingTimes > this.page) {
                        this.loading = false;
                        this.finished = true;
                    } else {
                        await this.getCertificate(this.loadingTimes);
                        this.show = true;
                        Toast.clear();
                    }
                }, 500);
            },
        },
        created() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            })
        }
    }
</script>

<style scoped>

</style>