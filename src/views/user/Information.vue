<template>
    <div id="user-info">
        <main v-if="!edit">
            <nav-bar title="个人资料" left-arrow @click-left="routerGo"></nav-bar>
            <section>
                <cell-group>
                    <cell title="头像" is-link class="cell-avatar" @click="avatarDialogShow = true">
                        <van-image :src="getImageUrl(userInfo.avatarUrl)" round></van-image>
                    </cell>
                    <cell title="昵称" is-link :to="{name:'user-change-nickname'}">{{userInfo.nickname}}</cell>
                    <cell title="姓名" is-link :to="{name:'user-change-real-name'}">{{realName}}</cell>
                    <cell title="性别" is-link @click="sexDialogShow = true">{{sex | sexFilter}}</cell>
                    <cell title="出生年月" is-link @click="birthdayDialogShow = true">
                        {{showBirthday?parseTime(birthday,'{y}-{m}-{d}'):'设置'}}
                    </cell>
                </cell-group>
            </section>
            <section>
                <cell-group>
                    <cell title="绑定手机" value="去修改" is-link
                          :to="{name:'user-change-phone',query:{phone:this.$store.state.userInfo.mobile}}"></cell>
                    <cell title="绑定邮箱" :value="email?'解除绑定':'去绑定'" @click="bindEmail" is-link></cell>
                </cell-group>
            </section>
            <section>
                <cell title="注销" @click="logout" is-link></cell>
            </section>
            <van-dialog v-model="avatarDialogShow" title="头像选择" confirmButtonText="取消">
                <grid :column-num="3" clickable square>
                    <grid-item text="拍照" @click="capturePicture">
                        <svg-icon slot="icon" data="@icon/camera.svg"></svg-icon>
                    </grid-item>
                    <label class="van-grid-item van-grid-item--square" :for="'avatar'"
                           style="flex-basis: 33.3333%; padding-top: 33.3333%;">
                        <div class="van-grid-item__content van-grid-item__content--center
                         van-grid-item__content--square van-grid-item__content--clickable van-hairline">
                            <svg-icon data="@icon/picture.svg"></svg-icon>
                            <span class="van-grid-item__text">相册</span>
                        </div>
                    </label>
                    <grid-item text="默认" @click="setDefaultAvatar">
                        <svg-icon slot="icon" data="@icon/round-picture.svg"></svg-icon>
                    </grid-item>
                </grid>
            </van-dialog>
            <file-upload v-model="files"
                         ref="upload" name="avatar" accept="image/jpeg" extensions="jpg,jpeg"
                         :timeout="30 * 1000" :size="2 * 1024 * 1024" :drop="!edit"
                         :post-action="`${postUrl}/profile/personal/avatar`" :headers="headers"
                         @input-file="inputFile"
                         @input-filter="fileInputFilter">
            </file-upload>
            <van-dialog v-model="birthdayDialogShow" title="生日选择" :close-on-click-overlay="true"
                        class="dialog-border" @confirm="setBirthday">
                <datetime-picker v-model="birthday" type="date" :min-date="minDate" :max-date="maxDate"
                                 :show-toolbar="false" :visible-item-count="3"></datetime-picker>
            </van-dialog>
            <van-dialog v-model="sexDialogShow" title="性别选择" :close-on-click-overlay="true"
                        :showConfirmButton="false">
                <grid :column-num="3" clickable square>
                    <grid-item @click="setSex('M')">
                        <svg-icon slot="icon" data="@icon/male.svg" color="#1296db"></svg-icon>
                        <span slot="text" class="item-text" style="color: #1296db">男</span>
                    </grid-item>
                    <grid-item @click="setSex('S')">
                        <template slot="icon">
                            <svg-icon data="@icon/question.svg" color="#515151"></svg-icon>
                            <span slot="text" class="item-text" style="color: #515151">保密</span>
                        </template>
                    </grid-item>
                    <grid-item @click="setSex('F')">
                        <template slot="icon">
                            <svg-icon data="@icon/female.svg" color="#d4237a"></svg-icon>
                            <span slot="text" class="item-text" style="color: #d4237a">女</span>
                        </template>
                    </grid-item>
                </grid>
            </van-dialog>
        </main>
        <article v-else>
            <nav-bar title="裁剪" @click-left="edit = false" @click-right="cropImage">
                <svg-icon class="nav-bar-icon" slot="left" data="@icon/close.svg"></svg-icon>
                <svg-icon class="nav-bar-icon" slot="right" data="@icon/choose.svg"></svg-icon>
            </nav-bar>
            <vue-cropper
                    ref="cropper" :view-mode="1" class="cropper-dialog" :auto-crop-area="1"
                    :crop-box-resizable="false" drag-mode="move" :src="cropperImageUrl"
                    :aspect-ratio="1" :background="false" alt>
            </vue-cropper>
            <tabbar fixed>
                <tabbar-item @click="rotate(-90)">
                    <svg-icon slot="icon" data="@icon/rotate-left.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
                <tabbar-item @click="rotate(90)">
                    <svg-icon slot="icon" data="@icon/rotate-right.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
                <tabbar-item @click="reset">
                    <svg-icon slot="icon" data="@icon/reset.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
                <tabbar-item @click.prevent="flipX">
                    <svg-icon slot="icon" data="@icon/flip.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
                <tabbar-item @click="zoom(0.2)">
                    <svg-icon slot="icon" data="@icon/zoom-in.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
                <tabbar-item @click="zoom(-0.2)">
                    <svg-icon slot="icon" data="@icon/zoom-out.svg" class="tab-bar-icon"></svg-icon>
                </tabbar-item>
            </tabbar>
        </article>
    </div>
</template>

<script>
    import {
        Tabbar, TabbarItem, NavBar, CellGroup, Icon, Image,
        GridItem, Grid, Cell, Dialog, DatetimePicker, Toast
    } from 'vant'
    import {parseTime} from '@/utils/time'
    import {getPersonalInfo, setDefaultAvatar, updatePersonal} from "@/api/profile"
    import FileUpload from 'vue-upload-component'
    import VueCropper from 'vue-cropperjs'
    import 'cropperjs/dist/cropper.css'
    import {getImageUrl} from "@/utils/image"
    import {deleteEmail, logout} from "@/api/passport";

    export default {
        name: "Information",
        components: {
            Cell, CellGroup, Grid, GridItem, DatetimePicker, NavBar, Tabbar, TabbarItem,
            "van-dialog": Dialog.Component, 'van-image': Image, Icon,
            FileUpload, VueCropper
        },
        filters: {
            sexFilter(sex) {
                const sexMap = {
                    "S": "保密",
                    "F": "女",
                    "M": "男"
                };
                return sexMap[sex];
            }
        },
        data() {
            return {
                userInfo: {
                    avatarUrl: '',
                    nickname: '',
                },
                parseTime,
                getImageUrl,
                minDate: new Date(1950, 0, 1),
                maxDate: new Date(),
                birthday: new Date(),
                showBirthday: false,
                birthdayDialogShow: false,
                sexDialogShow: false,
                sex: "S",
                realName: '',
                email: null,
                avatarDialogShow: false,
                files: [],
                postUrl: '',
                headers: {Authorization: localStorage.getItem('token')},
                edit: false,
                cropperImageUrl: '',
                flip: false,
                capture: false
            }
        },
        methods: {
            routerGo() {
                this.$router.replace({name: 'profile'});
            },
            async getInfo() {
                let res = null;
                if (this.$store.state.hasInfo) res = {data: this.$store.state.userInfo};
                else {
                    res = await getPersonalInfo();
                    if (res) this.$store.commit('setInfo', res.data);
                }
                if (res) {
                    if (res.data.birthday) {
                        this.showBirthday = true;
                        const date = res.data.birthday.split("-");
                        this.birthday = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));
                    } else this.birthday = new Date();
                    this.sex = res.data.sex;
                    this.realName = res.data.realName;
                    this.email = res.data.email;
                }
            },
            capturePicture() {
                if (!navigator.camera) Toast.fail('您的设备暂时不支持此功能');
                else {
                    let _this = this;
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: 1
                    });

                    function onSuccess(imageURI) {
                        _this.edit = true;
                        _this.cropperImageUrl = imageURI;
                        _this.avatarDialogShow = false;
                        _this.capture = true;
                    }

                    function onFail() {
                        this.edit = false;
                    }
                }
            },
            fileInputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(jpg|jpeg)$/i.test(newFile.name)) {
                        Toast.fail("请选择JPG格式图片文件上传");
                        return prevent()
                    }
                    if (newFile.size > 10 * 1024 * 1024) {
                        Toast.fail("请选择10M以下的图片文件上传");
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = '';
                    let URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL) {
                        newFile.url = URL.createObjectURL(newFile.file);
                    }
                }
            },
            inputFile(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!this.capture) {
                        this.$nextTick(() => {
                            this.edit = true;
                            this.avatarDialogShow = false;
                            this.cropperImageUrl = this.files[0].url;
                        })
                    } else {
                        this.capture = false;
                        if (newFile.error) {
                            Toast.clear();
                            Toast.fail("修改失败");
                        }
                        if (newFile.success) {
                            Toast.clear();
                            const response = newFile.response;
                            if (response.status === 1) {
                                Toast.success('修改成功');
                                this.userInfo.avatarUrl = response.avatarUrl;
                                this.$store.commit('changeInfo', {key: 'avatarUrl', value: response.avatarUrl});
                            } else Toast.fail(response.msg);
                        }
                    }
                }
                if (!newFile && oldFile) {
                    this.edit = false
                }
                if (newFile && oldFile) {
                    if (newFile.error !== oldFile.error) {
                        Toast.clear();
                        console.log(newFile.error);
                        Toast.fail("修改失败");
                    }
                    if (newFile.success !== oldFile.success) {
                        Toast.clear();
                        const response = newFile.response;
                        if (response.status === 1) {
                            Toast.success('修改成功');
                            this.userInfo.avatarUrl = response.avatarUrl;
                            this.$store.commit('changeInfo', {key: 'avatarUrl', value: response.avatarUrl});
                        } else Toast.fail(response.msg);
                    }
                }
            },
            cropCapture() {
                let binStr = atob(this.$refs.cropper.getCroppedCanvas().toDataURL("image/jpeg").split(',')[1]);
                let arr = new Uint8Array(binStr.length);
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                let file = new File([arr], "capture-avatar.jpeg", {type: "image/jpeg"});
                if (file.size > 2 * 1024 * 1024) Toast.fail('裁剪的图片超过2M，请更换图片文件再试');
                else {
                    this.edit = false;
                    Toast.loading({
                        duration: 30 * 1000,
                        forbidClick: true,
                        loadingType: 'spinner',
                        message: '正在提交'
                    });
                    this.$nextTick(() => {
                        this.$refs.upload.add(file);
                        this.$refs.upload.active = true;
                    });
                }
            },
            cropImage() {
                if (this.capture) {
                    this.cropCapture()
                } else {
                    let oldFile = this.files[0];
                    let binStr = atob(this.$refs.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1]);
                    let arr = new Uint8Array(binStr.length);
                    for (let i = 0; i < binStr.length; i++) {
                        arr[i] = binStr.charCodeAt(i)
                    }
                    let file = new File([arr], oldFile.name, {type: oldFile.type});
                    if (file.size > 2 * 1024 * 1024) Toast.fail('裁剪的图片超过2M，请更换图片文件再试');
                    else {
                        this.edit = false;
                        Toast.loading({
                            duration: 30 * 1000,
                            forbidClick: true,
                            loadingType: 'spinner',
                            message: '正在提交'
                        });
                        this.$nextTick(() => {
                            this.$refs.upload.update(oldFile.id, {
                                file,
                                type: file.type,
                                size: file.size,
                                active: true,
                            })
                        });
                    }
                }
            },
            rotate(deg) {
                this.$refs.cropper.rotate(deg);
            },
            reset() {
                this.$refs.cropper.reset();
            },
            flipX() {
                this.$refs.cropper.scaleX(this.flip ? 1 : -1);
                this.flip = !this.flip;
            },
            zoom(percent) {
                this.$refs.cropper.relativeZoom(percent);
            },
            async setDefaultAvatar() {
                let res = await setDefaultAvatar();
                if (res) {
                    this.avatarDialogShow = false;
                    Toast.success('修改成功');
                    this.userInfo.avatarUrl = res.avatarUrl;
                    this.$store.commit('changeInfo', {key: 'avatarUrl', value: res.avatarUrl});
                }
            },
            async setSex(val) {
                const res = updatePersonal({sex: val});
                if (res) {
                    this.sex = val;
                    this.sexDialogShow = false;
                    this.$store.commit('changeInfo', {key: 'sex', value: val});
                    Toast.success('修改成功');
                }
            },
            async setBirthday() {
                const res = updatePersonal({birthday: this.birthday});
                if (res) {
                    this.showBirthday = true;
                    this.birthdayDialogShow = false;
                    this.$store.commit('changeInfo', {key: 'birthday', value: this.birthday});
                    Toast.success('修改成功');
                }
            },
            async bindEmail() {
                if (this.email) {
                    Dialog.confirm({
                        title: '解除绑定邮箱',
                        message: '您确认要解除绑定的邮箱吗？'
                    }).then(async () => {
                        const res = await deleteEmail();
                        if (res) {
                            this.$store.commit('changeInfo', {key: 'email', value: null});
                            this.email = null;
                        }
                    })
                } else await this.$router.push({name: 'user-bind-email'})
            },
            async logout() {
                Dialog.confirm({
                    title: '注销',
                    message: '您确认要注销吗？'
                }).then(async () => {
                    if (this.$store.state.loginState) {
                        const res = await logout();
                        if (res) {
                            this.$store.commit('exit');
                            await this.$router.push({name: 'profile'});
                        }
                    }
                });
            }
        },
        created() {
            this.postUrl = process.env.NODE_ENV === 'development' ?
                process.env.VUE_APP_BASE_API : process.env.VUE_APP_PRODUCTION_API;
            this.userInfo = this.$store.state.userInfo;
            this.getInfo();
        },
        beforeRouteLeave(to, from, next) {
            if (this.edit) {
                this.edit = false;
                next(false);
            } else next();
        }
    }
</script>

<style lang="less">
    #user-info {
        section {
            margin-top: 18px;
        }

        .cell-avatar {
            .van-cell__title, .van-cell__right-icon {
                margin: auto 0;
            }
        }

        .van-dialog__header {
            padding: 13px;
        }

        .dialog-border {
            .van-dialog__content {
                border-top: 1px solid #ebedf0;
            }
        }

        .upload-grid-item {
            .item-upload {
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                align-items: center;
                -webkit-align-items: center;
                flex-direction: column;
                -webkit-flex-direction: column;
                padding: 24px 38px;
            }
        }

        .van-grid-item {
            .svg-icon {
                width: 30px;
                height: 30px;
                margin-bottom: 8px;
            }

            .item-text {
                font-size: 16px;
                word-break: break-all;
            }
        }

        .van-image {
            margin-right: 3vw;
            height: 55px;
            width: 55px;
        }

        article {
            background-color: #000;

            .cropper-dialog {
                height: calc(100vh - 97px);
            }

            .nav-bar-icon {
                height: 18px;
                width: 18px;
                vertical-align: middle;
            }

            .tab-bar-icon {
                height: 30px;
                width: 30px;
                vertical-align: middle;
            }
        }
    }
</style>
