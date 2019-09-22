<template>
    <div id="user">
        <div class="user-view">
            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                title: null,
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        }
    }
</script>

<style lang="less">
    #user {
        background-color: #f6f6f6;
        height: 100%;
        .user-view{
        }
    }
</style>
