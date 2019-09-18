<template>
    <div class="login-form">
        <div class="short-message-code">
            <h2>输入短信验证码</h2>
            <span class="message-info">短信验证码至 183 0192 5596</span>
            <code-input v-model="verifyCode" :mask="false" :focused="showKeyboard"
                        @focus="showKeyboard = true"></code-input>
            <number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"
                             @blur="showKeyboard = false"></number-keyboard>
            <span class="message-info" style="color: #409eff">重新发送</span>
        </div>
    </div>
</template>

<script>
    import {PasswordInput, NumberKeyboard} from 'vant'

    export default {
        name: "ShortMessageCode",
        components: {'code-input': PasswordInput, NumberKeyboard},
        data() {
            return {
                verifyCode: '',
                showKeyboard: false
            }
        },
        methods: {
            onInput(key) {
                this.verifyCode = (this.verifyCode + key).slice(0, 6);
            },
            onDelete() {
                this.verifyCode = this.verifyCode.slice(0, this.verifyCode.length - 1);
            }
        },
        beforeCreate() {
            this.$emit('setTitle', '短信验证码');
        }
    }
</script>

<style lang="less">
    .short-message-code {
        margin-top: 5vh;

        h2, .message-info {
            font-weight: 500;
        }

        .message-info {
            font-size: 0.85em;
            color: #666;
        }

        .van-password-input {
            margin: 3vh 0;
        }
    }
</style>
