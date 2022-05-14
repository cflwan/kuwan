<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
   <!-- 文章详情加载状态 -->
    <van-loading type="spinner" color="#1989fa" v-if="detailList.title===undefined" >
      加载中...
    </van-loading>
 <div v-else>
      <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ detailList.title }}</h1>

      <!-- 用户信息 -->
      <van-cell
        center
        :title="detailList.aut_name"
        :label="setTime(detailList.pubdate)"
      >
        <template #icon>
          <img :src="detailList.aut_photo" alt="# " class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="detailList.is_followed"
              @click="unfollowFn()" >已关注</van-button
            >
            <van-button icon="plus" type="info" size="mini" plain v-else
              @click="followFn()">关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="detailList.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="detailList.attitude === 1"
          @click="unlikefn"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else
          @click="likefn">点赞</van-button
        >
      </div>
    </div>
    <!-- 文章评论区域 -->
     <comment-list></comment-list>
 </div>

  </div>
</template>

<script>
import { detailApi, unfollowApi, followApi, unlikeApi, likeAPi } from '@/api/index'
import { timeAgo } from '@/utils/date'
// 导入评论页组件

import CommentList from './commentList.vue'
export default {
  name: 'detailPage',
  components: {
    CommentList
  },
  data () {
    return {
      detailList: {}
    }
  },
  methods: {
    setTime: timeAgo,
    // 取消关注
    async unfollowFn (bool = false) {
      // 点击已关注，关注按钮就会显示，已关注就会取消
      this.detailList.is_followed = false // 关闭已关注
      // 接口取消关注
      const res = await unfollowApi({
        autId: this.detailList.aut_id
      })
      console.log(res)
    },
    // 关注
    async  followFn (bool = true) {
      // 点击关注，已关注就会显示，关注就不显示
      this.detailList.is_followed = true
      // 接口是关注
      const res = await followApi({
        autId: this.detailList.aut_id
      })
      console.log(res)
    },
    // 点击已点赞，就是不点赞，不喜欢，点赞就会出现
    async  unlikefn () {
      this.detailList.attitude = 0
      // 调用不点赞接口
      const res = await unlikeApi({
        autId: this.detailList.art_id
      })
      console.log(res)
    },
    // 点击点赞，已点赞就会出现
    async  likefn () {
      this.detailList.attitude = 1
      // 调用点赞接口
      const res = await likeAPi({
        autId: this.detailList.art_id
      })
      console.log(res)
    }

  },
  async created () {
    const res = await detailApi({
      art_id: this.$route.query.art_id
    })
    console.log(res)
    this.detailList = res.data.data
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
// 文章详情加载时出现加载状态
.van-loading{
  text-align: center;
  padding-top: 46px;
}
</style>
