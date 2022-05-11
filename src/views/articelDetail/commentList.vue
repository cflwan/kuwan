<template>
  <div>
    <!-- 评论列表 -->
    <!-- 给评论列表外层容器动态设置类名-距离底部
        防止底部输入框, 挡住隔壁的内容 :class="{'art-cmt-container-1':isShow,'art-cmt-container-2':!isShow}
        动态绑定class
    -->
    <!-- 包裹评论主体区域，下拉刷新更多的评论 -->

    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShow,
        'art-cmt-container-2': !isShow,
      }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="obj in commentList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                v-if="obj.is_liking"
                @click="likeFn(obj)"
              />
              <van-icon
                name="like-o"
                size="16"
                color="gray"
                v-else
                @click="unlikeFn(obj)"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ formdate(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 发表评论 -->
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShow">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="sendCmtMeg">发表评论</div>
      <div class="icon-box">
        <van-badge :content="commentNum === 0 ? '' : commentNum" max="99">
          <van-icon name="comment-o" size="0.53333334rem" />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea
        @blur="blurFn"
        v-fofo
        placeholder="友善评论、理性发言、阳光心灵"
        v-model="addCmt"
      ></textarea>
      <van-button
        type="default"
        :disabled="addCmt.length === 0"
        @click="sendMsgFn"
        >发布</van-button
      >
      <!-- disabled 默认值是true 就是按钮处于静止状态，如果加以判断就可以使按钮处于可用与禁止状态 -->
      <!-- 点击发布按钮不能使用：原因是点击发布按钮失去焦点，
      在textarea标签里又绑定了失去焦点事件并且失去焦点后页面不在显示，
      因此可以给@blur绑定一个方法并且在里面添加定时器，效果就出来了-->
    </div>
  </div>
</template>

<script>
import {
  commentDateAPi,
  dislikeDataApi,
  likeDataApi,
  toCmtDataApi
} from '@/api/index'

import { timeAgo } from '@/utils/date'

export default {
  data () {
    return {
      offset: null,
      commentList: [],
      isShow: true,
      commentNum: 0, // 接口总共评论数量
      addCmt: '',
      loading: false,
      finished: false,
      lastpage: null // 分页
    }
  },
  async created () {
    const res = await commentDateAPi({
      id: this.$route.query.art_id
    })
    this.commentList = res.data.data.results
    // console.log(res)
    this.commentNum = res.data.data.total_count
    this.lastpage = res.data.data.last_id
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    formdate: timeAgo,
    async likeFn (obj) {
      obj.is_liking = false
      const res = await dislikeDataApi({
        artId: obj.com_id
      })
      console.log(res)
    },
    async unlikeFn (obj) {
      obj.is_liking = true
      const res = await likeDataApi({
        artId: obj.com_id
      })
      console.log(res)
    },
    sendCmtMeg () {
      this.isShow = false
      this.addCmt = ''
    },
    // 失去焦点绑定一个方法，让它稍后执行
    blurFn () {
      setTimeout(() => {
        this.isShow = true
      }, 0)
    },
    // 点击按钮事件
    async sendMsgFn () {
      const res = await toCmtDataApi({
        artId: this.$route.query.art_id,
        content: this.addCmt
      })
      //   console.log(res)
      this.commentList = res.data.data.new_obj
    },
    // immediate-check:内部不在进行判断而已，监听滚动事件的代码还在
    // 这一个频道滚动到底部，在切换第二个频道的时候（新建-内容没有那么高），滚动会从底部滚动回到底部
    // 这个时候发生了滚动，所以滚动事件还是触发了，immediate-check判断无效
    async  onLoad () {
      if (this.commentList.length === 0) {
        this.loading = false// 表示加载结束
        return // 如果页面没有数据，没有高度，让本次onLoad逻辑代码不往下执行
      }
      const res = await commentDateAPi({
        id: this.$route.query.art_id,
        offset: this.lastpage
      })

      this.commentList = [...this.commentList, ...res.data.data.results]
      // console.log(res)
      this.commentNum = res.data.data.total_count
      this.lastpage = res.data.data.last_id
      this.loading = false
      if (res.data.data.last_id === null) {
        this.finished = true
      }
    }

  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
