<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item,index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="item.name==='xs'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{item.msg}}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{item.msg}}</div>
          <van-image
            fit="cover"
            round
            :src="$store.state.userphoto"
          />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="word">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入 socket.io-client 包
import { io } from 'socket.io-client'
// 导入token
import { getToken } from '@/utils/token'
export default {
  name: 'chatPage',
  data () {
    return {
      word: '', // 输入框的内容
      // 所有的聊天消息
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }

      ],
      socket: null

    }
  },
  //
  methods: {
    //  点击提交按钮发布消息
    sendFn () {
      if (this.word.trim().length === 0) {
        return
      }
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })
      //   加入到聊天数组中
      this.list.push({
        msg: this.word,
        name: 'me'
      })
      //   运行完之后清空输入框里的内容
      //   最后一条聊天消息滚动到屏幕范围
      //   数据变化——》DOM 更新是异步的,所以获取到的是上一条div
      this.$nextTick(() => { // this.$nextTick() 有点类似于setTimeOUt ;this.$nextTick()过一会渲染DOM，Vue自带的
        const theDive = document.querySelector('.chat-list>div:last-child')
        theDive.scrollIntoView({
          behavior: 'smooth' // 平滑滚动
        })
      })
      this.word = ''
    }
  },
  //
  created () {
    // 创建客户端websocket
    this.socket = io('http://geek.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    // 这一段是测试代码
    this.socket.on('connect', () => {
      console.log('建立连接成功')
    })
    // 接受来自后端的消息
    this.socket.on('message', (obj) => {
    // 后端回来的对象加入到数组里
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })
      this.$nextTick(() => { // this.$nextTick() 有点类似于setTimeOUt ;this.$nextTick()过一会渲染DOM，Vue自带的
        const theDive = document.querySelector('.chat-list>div:last-child')
        theDive.scrollIntoView({
          behavior: 'smooth' // 平滑滚动
        })
        console.log(theDive)
      })
    })
    // 最后一条聊天消息滚动到屏幕范围
    // 数据变化——》DOM 更新是异步的,所以获取到的是上一条div
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
/deep/ .van-icon {
  color:#fff
}
</style>
