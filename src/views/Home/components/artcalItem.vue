<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{tobj.title}}</span>
        <!-- 单图图片放置 -->
        <img class="thumb" v-if="tobj.cover.type===1" :src="tobj.cover.images[0]"/>
      </div>
      <!-- 三图  判断大于一比较严谨-->
      <div class="thumb-box" v-if="tobj.cover.type>1">
        <img class="thumb" v-for="(imgUrl,index) in tobj.cover.images" :key="index" :src="imgUrl" alt="#">
     </div>

    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{tobj.aut_id}}</span>
          <span>{{tobj.comm_count}}评论</span>
          <span>{{formatTime(tobj.pubdate)}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
export default {
  props: {
    tobj: Object
  },
  methods: {
    formatTime: timeAgo // timeAgo是一个方法,插件封装在utils
  }
}

</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
