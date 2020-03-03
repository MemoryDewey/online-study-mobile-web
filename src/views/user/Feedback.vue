<template>
    <div class="user-feedback" v-show="show">
        <section>
            <div class="feedback-title">选择反馈类型</div>
            <radio-group v-model="result">
                <cell-group>
                    <cell
                            v-for="(item, index) in feedbackList"
                            clickable
                            :key="index"
                            :title="item.name"
                            @click="result=item.id">
                        <radio :name="item.id" slot="right-icon"/>
                    </cell>
                </cell-group>
            </radio-group>
        </section>
        <section>
            <div class="feedback-title">补充详情</div>
            <van-input placeholder="请写下您的意见或建议"
                       rows="4" maxlength="150" type="textarea" v-model="content"
                       autosize show-word-limit></van-input>
        </section>
        <div class="feedback-bottom">
            <van-button size="large" type="info" @click="submitFeedback">提交</van-button>
        </div>
    </div>
</template>

<script>
    import {Radio, RadioGroup, CellGroup, Cell, Field, Button, Toast} from "vant"
    import {getFeedbackType, submitFeedback} from "@/api/personal";

    export default {
        name: "Feedback",
        components: {
            RadioGroup, Radio, CellGroup, Cell, 'van-input': Field, 'van-button': Button
        },
        data() {
            return {
                result: NaN,
                show: false,
                feedbackList: [],
                content: ''
            }
        },
        methods: {
            submitFeedback() {
                if (isNaN(this.result)) Toast.fail('请选择反馈类型');
                else if (this.content.length < 10) Toast.fail('反馈详情请至少填写10个字');
                else {
                    submitFeedback({type: this.result, content: this.content}).then(res => {
                        if (res) {
                            Toast.success(res.msg);
                            this.result = NaN;
                            this.content = '';
                        }
                    });
                }
            }
        },
        async created() {
            this.$emit('setNavBarRight', {show: false});
            let res = await getFeedbackType();
            this.feedbackList = res['feedbackType'];
            this.show = true;
        }
    }
</script>

<style lang="less">
    .user-feedback {
        section {
            margin-bottom: 10px;
        }

        .feedback-title {
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 16px 0;
            background-color: #fff;

            &:after {
                color: #ee0a24;
                font-size: 14px;
                margin-left: 10px;
                content: '*';
            }
        }

        [class*=van-hairline]::after {
            border: 0;
        }

        .feedback-bottom {
            padding: 10px 16px;

            button {
                height: 40px;
                line-height: 40px;
            }
        }
    }
</style>
