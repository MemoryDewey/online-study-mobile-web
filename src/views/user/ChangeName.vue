<template>
    <div id="user-change-name">
        <nav-bar left-arrow :title="this.$route.meta.title" @click-left="routerGo" @click-right="saveName">
            <span slot="right">保存</span>
        </nav-bar>
        <section>
            <field v-model="name" :placeholder="`请输入新${type}`"></field>
        </section>
    </div>
</template>

<script>
    import {NavBar, Field, Toast} from 'vant'
    import {updatePersonal} from "@/api/profile";

    export default {
        name: "ChangeName",
        components: {
            NavBar, Field
        },
        data() {
            return {
                type: '',
                name: ''
            }
        },
        methods: {
            routerGo() {
                this.$router.push('information')
            },
            async saveName() {
                let data = this.$route.name === 'user-change-nickname' ? {nickname: this.name} : {realName: this.name};
                const res = await updatePersonal(data);
                if (res) {
                    Toast.success('保存成功');
                    await this.$router.push('information')
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
    }
</style>
