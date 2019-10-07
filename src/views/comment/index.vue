<template>
    <div id="study-course-comment">
        <nav-bar :title="title" left-arrow  @click-left="toStudy"></nav-bar>
        <router-view @changeTitle="changeTitle" />
    </div>
</template>

<script>
    import {NavBar} from 'vant'

    export default {
        name: "index",
        components: {NavBar},
        data() {
            return {
                title: ''
            }
        },
        methods: {
            changeTitle(val){
                this.title = val;
            },
            toStudy() {
                this.$router.replace({name: 'course-study', id: this.$route.params.id})
            }
        }
    }
</script>

<style lang="less">
    #study-course-comment {

    }
</style>
