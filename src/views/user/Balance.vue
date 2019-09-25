<template>
    <div id="user-balance">
        <nav-bar left-arrow :title="this.$route.meta.title" @click-left="routerGo">
            <span slot="right">余额明细</span>
        </nav-bar>
        <section>
            <span>总余额</span>
            <div class="balance">
                <icon name="gold-coin" color="#dcbb70"></icon>
                <a>0.00</a>
            </div>
        </section>
    </div>
</template>

<script>
    import {NavBar, Icon} from 'vant'

    export default {
        name: "Balance",
        components: {
            NavBar, Icon
        },
        methods: {
            routerGo() {
                this.$router.replace({name: 'profile'});
            },
        }
    }
</script>

<style lang="less">
    #user-balance {
        section {
            margin-top: 50px;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            flex-direction: column;
            -webkit-flex-direction: column;

            span {
                font-size: 14px;
                color: #7d7e80;
            }

            .balance {
                margin-top: 5px;
                font-size: 40px;

                a, i {
                    vertical-align: middle;
                    padding: 0 5px;
                }
            }
        }
    }
</style>
