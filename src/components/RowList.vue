<template>
    <section class="row-list-scroll">
        <div class="row-list-wrap">
            <ul class="row-list">
                <li class="row-list-item" v-for="(item,index) in listData" :key="index">
                    <slot name="item" :item="item"></slot>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "RowList",
        props: {
            listData: {required: true, type: Array}
        }
    }
</script>

<style lang="less">
    .row-list-scroll {
        overflow: hidden;
        position: relative;

        .row-list-wrap {
            overflow-x: auto;
            overflow-y: hidden;
            position: relative;
            margin-bottom: -1.61vh;
        }

        .row-list {
            list-style: none;
            white-space: nowrap;
            padding: 1vh 0;
        }

        .row-list-item {
            display: inline-block;
            position: relative;
            margin-right: 4vw;
        }
    }
</style>
