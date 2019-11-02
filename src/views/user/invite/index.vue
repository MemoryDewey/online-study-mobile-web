<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "Invite",
        methods: {
            gotoIntro() {
                this.$router.push({name: 'user-invite-intro'})
            }
        },
        created() {
            this.$emit('setNavBarRight', {show: true, icon: 'question', funcName: 'gotoIntro'});
        }
    }
</script>

<style lang="less">

</style>
