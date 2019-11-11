<template>
    <div id="exam">
        <div class="question" v-for="(item,index) in exam" :key="index">
            <div class="title">{{index+1}}. {{item.title}}({{item.score}}分)</div>
            <radio-group v-model="radio[index]">
                <cell-group>
                    <cell v-for="(section,ind) in item.section" :key="ind"
                          clickable :title="section['content']"
                          @click="radio[index]=section['choose']">
                        <i slot="icon" class="section">{{section['choose']}}</i>
                        <radio slot="right-icon" :name="section['choose']"/>
                    </cell>
                </cell-group>
            </radio-group>
        </div>

    </div>
</template>

<script>
    import {getExam} from "@/api/course";
    import {Toast, CellGroup, Cell, RadioGroup, Radio} from "vant"

    export default {
        name: "Exam",
        components: {
            Cell, CellGroup, Radio, RadioGroup
        },
        data() {
            return {
                exam: [],
                result: [],
                radio: []
            }
        },
        beforeCreate() {
            this.$emit('setTab', false);
        },
        created() {
            getExam({courseID: this.$route.params.id}).then(res => {
                if (res.finished.state) {
                    this.exam = res.exam;
                } else {

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
