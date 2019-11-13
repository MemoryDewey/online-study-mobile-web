<template>
    <div id="exam">
        <div class="question" v-for="(item,index) in exam" :key="index">
            <div class="title">{{index+1}}. {{item.title}}({{item.score}}分)</div>
            <radio-group v-model="radio[index]" :disabled="disabled">
                <cell-group>
                    <cell v-for="section in item.section" :key="section['choose']"
                          :title="section['content']">
                        <i slot="icon" class="section">{{section['choose']}}</i>
                        <radio slot="right-icon" :name="section['choose']" shape="square"/>
                    </cell>
                </cell-group>
            </radio-group>
        </div>
        <van-button size="large" type="info" @click="submitExam" v-if="radio.length>0 && !disabled">提交</van-button>
    </div>
</template>

<script>
    import {getExam, addExam} from "@/api/course";
    import {CellGroup, Cell, RadioGroup, Radio, Button, Dialog} from "vant"

    export default {
        name: "Exam",
        components: {
            Cell, CellGroup, Radio, RadioGroup, 'van-button': Button
        },
        data() {
            return {
                exam: [],
                result: [],
                radio: [],
                disabled: false
            }
        },
        methods: {
            submitExam() {
                Dialog.confirm({
                    title: '提交试卷',
                    message: '确认提交试卷？提交后不可更改'
                }).then(async () => {
                    let res = await addExam({
                        courseID: this.$route.params.id,
                        answer: this.radio,
                        exam: {type: 'exam', id: this.$route.params.id},
                    });
                    if (res) {
                        this.$router.go(-1);
                    }
                })
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
        created() {
            getExam({courseID: this.$route.params.id}).then(res => {
                for (let i in res.exam) this.radio.push('');
                this.exam = res.exam;
                if (res.finished.state) {
                    this.disabled = true;
                    this.radio = res.finished.result.map(x => x['choose']);
                } else {
                    this.disabled = false;
                }
            });
        }
    }
</script>

<style lang="less">
    #exam {
        height: calc(100vh - 46px);
        position: relative;
        overflow: auto;

        .question {
            padding: 10px 16px;

            .title {
                font-size: 18px;
                margin-bottom: 10px;
            }

            .van-cell__title {
                word-break: break-all;
            }

            .section {
                margin-right: 5px;
            }
        }
    }
</style>
