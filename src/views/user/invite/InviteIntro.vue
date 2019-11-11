<template>
    <div id="intro">
        <h1>邀请说明</h1>
        <h2>一、如何邀请好友</h2>
        <ol>
            <li>进入<strong>个人中心</strong> - <strong>邀请好友</strong>界面</li>
            <li>点击<strong>复制邀请链接</strong>按钮</li>
            <li>或者<strong>保存邀请二维码</strong></li>
            <li>将<strong>邀请链接</strong>或<strong>邀请二维码</strong>发送给朋友</li>
        </ol>
        <h2>二、邀请好友的规则有哪些</h2>
        <ol>
            <li>每个用户能邀请多位好友</li>
            <li>每个用户只能接受一位好友的邀请</li>
        </ol>
        <h2>三、邀请好友的奖励有哪些</h2>
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
