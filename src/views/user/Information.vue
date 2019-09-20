<template>
    <div id="user-info">
        <section>
            <cell-group>
                <cell title="头像" is-link class="cell-avatar" @click="avatarDialogShow = true">
                    <van-image :src="userInfo.avatarUrl" height="7.5vh" width="7.5vh" round></van-image>
                </cell>
                <cell title="昵称" is-link></cell>
                <cell title="姓名" is-link></cell>
                <cell title="性别" is-link></cell>
                <cell title="出生年月" is-link></cell>
            </cell-group>
        </section>
        <section>
            <cell-group>
                <cell title="绑定手机" is-link></cell>
                <cell title="绑定邮箱" is-link></cell>
            </cell-group>
        </section>
        <van-dialog v-model="avatarDialogShow" title="头像选择" confirmButtonText="取消">
            <grid :column-num="3" clickable square>
                <grid-item icon="photo-o" text="拍照"/>
                <grid-item icon="photo-o" text="相册"/>
                <grid-item icon="photo-o" text="默认"/>
                <uploader capture="camera"></uploader>
            </grid>
        </van-dialog>
    </div>
</template>

<script>
    import {CellGroup, Image, GridItem, Grid, Cell, Uploader, Dialog} from 'vant'

    export default {
        name: "Information",
        components: {
            Cell, CellGroup, Grid, GridItem, Uploader,
            "van-dialog": Dialog.Component, 'van-image': Image,
        },
        data() {
            return {
                userInfo: {
                    avatarUrl: '',
                    nickname: '',
                },
                avatarDialogShow: false
            }
        },
        beforeCreate() {
            this.$emit('setTitle', this.$route.meta.title);
        },
        methods: {},
        created() {
            this.userInfo = this.$store.state.userInfo;
        }
    }
</script>

<style lang="less">
    #user-info {
        section {
            margin-top: 2.5vh;
        }

        .cell-avatar {
            .van-cell__title, .van-cell__right-icon {
                margin: auto 0;
            }
        }

        .van-dialog__header {
            padding: 13px;
        }

        .van-image {
            margin-right: 3vw;
        }
    }
</style>
