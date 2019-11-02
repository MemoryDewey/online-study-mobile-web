<template>
    <div id="intro">
        <h1>邀请说明</h1>
        <h2>一、如何邀请好友</h2>
        <ol>
            <li>进入<strong>个人中心</strong> - <strong>邀请好友</strong>界面</li>
            <li>点击<strong>接受邀请</strong>按钮</li>
            <li>输入好友的<strong>邀请码</strong>并提交后即可接受好友的邀请</li>
        </ol>
        <h2>二、如何接受好友的邀请</h2>
        <ol>
            <li>进入<strong>个人中心</strong> - <strong>邀请好友</strong>界面</li>
            <li>点击<strong>接受邀请</strong>按钮</li>
            <li>输入好友的<strong>邀请码</strong>并提交后即可接受好友的邀请</li>
        </ol>
        <h2>三、邀请好友的规则有哪些</h2>
        <ol>
            <li>每个用户能邀请多位好友</li>
            <li>每个用户只能接受一位好友的邀请</li>
        </ol>
        <h2>四、邀请好友的奖励有哪些</h2>
        <ol>
            <li>推荐好友成功注册本学习平台，如果好友购买本平台的课程，推荐者即可获得课程费用的20%作为奖励。</li>
            <li>如果被推荐好友进行 ① 操作，则推荐者可以获得课程费用的5%作为奖励。</li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "InviteIntro",
        created(){
            this.$emit('setNavBarRight', {show: false});
        }
    }
</script>

<style scoped>

</style>
