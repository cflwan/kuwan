<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center >
        <template #default>
          <van-image round class="avatar" :src="userprofileList.photo" @click="getImgClick" />
          <!-- 下面是上传文件输入框 -->
            <input
               type="file"
               ref="iptFile"
               v-show="false"
               accept="image/*"
               @change="onFileChange"
               />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="userprofileList.name" />
      <van-cell title="生日" is-link :value="userprofileList.birthday"/>
    </van-cell-group>
  </div>
</template>

<script>
// 导入用户个人资料的API
import { getProfileMsgApi, updataUserPhotoApi } from '@/api/index'

export default {
  name: 'UserEdit',
  data () {
    return {
      userprofileList: {}
    }
  },
  //   个人资料铺设
  async created () {
    const res = await getProfileMsgApi()
    this.userprofileList = res.data.data
  },
  methods: {
    //   给change事件【该事件在输入框的值发生变动时触发】绑定方法
    async onFileChange (e) {
      console.log(e.target.files[0])
      if (e.target.files.length === 0) {
        return
      }
      const thefd = new FormData()
      thefd.append('photo', e.target.files[0])
      const res2 = await updataUserPhotoApi(thefd)
      //   this.userprofileList.photo =res.
      console.log(res2)
      this.userprofileList.photo = res2.data.data.photo
    },
    getImgClick () {
      this.$refs.iptFile.click()
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
