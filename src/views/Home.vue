<template>
    <div class="home">
        <div class="head-search">
            <search placeholder="请输入课程关键词"></search>
        </div>
      <main>
        <div class="banner">
          <swipe :autoplay="3000">
            <swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" alt/>
            </swipe-item>
          </swipe>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </main>
    </div>
</template>

<script>
    import HelloWorld from "@/components/HelloWorld"
    import {NavBar, Swipe, SwipeItem, Search} from 'vant'

    export default {
        name: 'home',
        components: {
            HelloWorld, SwipeItem, Swipe, Search, NavBar
        },
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
            }
        }
    }
</script>

<style lang="less">
    @home-head-height: 54px;
    .home {
        .head-search {
            top: 0;
            left: 0;
            width: 100%;
            line-height: @home-head-height;
            height: @home-head-height;
            text-align: center;
            z-index: 1;
            position: fixed;
        }

        main {
          position: relative;
          overflow: auto;
          margin-top: @home-head-height;
          height: calc(100vh - @home-head-height - 50px);
          .banner {
            padding: 0 12px;

            .van-swipe {
              .van-swipe-item {
                img {
                  width: 100%;
                  height: calc(100vw / 16 * 9);
                }
              }
            }
          }
        }
    }
</style>
