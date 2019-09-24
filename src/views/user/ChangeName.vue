<template>
    <div id="user-change-name">
        <nav-bar left-arrow :title="this.$route.meta.title" @click-left="routerGo" @click-right="saveName">
            <span slot="right">保存</span>
        </nav-bar>
        <section>
            <van-input v-model="name" :placeholder="`请输入新${type}`" :border="false"
                       clearable maxlength="15"></van-input>
            <div class="bottom-text">可输入 <span style="color: #ee0a24">{{remainWord - name.length}}</span> 字</div>
        </section>
    </div>
</template>

<script>
    import {NavBar, Field, Toast} from 'vant'
    import {updatePersonal} from "@/api/profile";

    export default {
        name: "ChangeName",
        components: {
            NavBar, 'van-input': Field
        },
        data() {
            return {
                type: '',
                name: '',
                remainWord: 15
            }
        },
        methods: {
            routerGo() {
                this.$router.go(-1)
            },
            async saveName() {
                let data, change;
                if (this.$route.name === 'user-change-nickname') {
                    data = {nickname: this.name};
                    change = {key: 'nickname', value: this.name};
                } else {
                    data = {realName: this.name};
                    change = {key: 'realName', value: this.name};
                }
                const res = await updatePersonal(data);
                if (res) {
                    Toast.success('保存成功');
                    this.$store.commit('changeInfo', change);
                    await this.$router.go(-1);
                }
            }
        },
        created() {
            this.type = this.$route.name === 'user-change-nickname' ? '昵称' : '姓名';
        }
    }
</script>
<style lang="less">
    #user-change-name {
        section {
            margin-top: 20px;
        }

        .nav-bar-icon {
            height: 18px;
            width: 18px;
            vertical-align: middle;
        }

        .van-field {
            background-color: transparent;

            .van-field__body {
                border-bottom: 1px solid #1989fa;
            }
        }

        .bottom-text {
            font-size: 12px;
            padding: 0 16px;
            text-align: right;
        }
    }
</style>
