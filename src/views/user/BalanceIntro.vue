<template>
    <div class="user-balance-intro">
        <h1>余额说明</h1>
        <h2>一、什么是余额</h2>
        <p>余额是课堂内虚拟货币，可用于直接购买课程。余额的单位是课程币，1课程币=1人民币。</p>
        <h2>二、如何使用余额</h2>
        <p>余额可在购买课程环节抵扣课程费用。</p>
        <h2>三、如何获取余额</h2>
        <ol>
            <li>通过推荐好友获取奖励余额。</li>
            <li>通过BST购买余额，需要绑定BST钱包。</li>
        </ol>
        <h2>四、奖励余额规则有哪些</h2>
        <ol>
            <li>推荐好友成功注册本学习平台，如果好友购买本平台的课程，推荐者即可获得课程费用的20%作为奖励。</li>
            <li>如果被推荐好友进行 ① 操作，则推荐者可以获得课程费用的5%作为奖励。</li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "BalanceIntro",
        methods: {},
    }
</script>

<style lang="less">
    .user-balance-intro {
        padding: 0 16px;

        h1, h2, p, ol {
            margin: 0;
        }

        h1 {
            margin-bottom: 10px;
            font-size: 22px;
            font-weight: 700;
            line-height: 40px;
            text-align: center;
        }

        h2 {
            margin-top: 10px;
            font-size: 18px;
            font-weight: 700;
            line-height: 32px;
            margin-bottom: 10px;
        }

        p {
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 10px;
        }

        ol {
            list-style: outside decimal;
            margin-left: 20px;
            font-size: 14px;
            margin-bottom: 10px;

            li {
                line-height: 20px;
                margin-bottom: 10px;
            }
        }
    }
</style>
