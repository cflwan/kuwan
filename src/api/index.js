import { test } from '@/utils/request'

// 获取用的所用频道
export const allItem = () => {
  return test({
    url: '/v1_0/channels',
    method: 'GET' // 可以写也可以不写 在request里已经写了默认的参数

  })
}
// 重置用户频道（重置式）
export const putUserChannelApi = ({ channels }) => {
  return test({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 频道---删除指定用户频道
export const removeChannelApi = ({ channeId }) => {
  return test({
    method: 'DELETE',
    url: `/v1_0/user/channels/ ${channeId}`
  })
}

// 获取用户的频道
// import { getToken } from '@/utils/token.js' // 导入封装的token

// 登录接口
export const loginApi = ({ mobile, code }) => {
  return test({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
    // axios POST请求用data
  })
}
// 获取用户的频道
export const userChannelsApi = () => {
  return test({
    url: '/v1_0/user/channels'
  })
}
// 获取文章新闻推荐
export const getallartcalListApi = ({ channel_id, timestamp }) => {
  return test({
    url: '/v1_0/articles',

    params: {
      channel_id,
      timestamp
    }
  })
}
// 获取不感兴趣接口
export const articelDislike = ({ artId }) => {
  return test({
    method: 'POST',
    url: '/v1_0/article/dislikes',
    data: {
      target: artId
    }
  })
}
// 获取举报接口
export const getReportApi = ({ autId, type }) => {
  return test({
    method: 'POST',
    url: '/v1_0/article/reports',

    data: {
      target: autId,
      // 获取文章ID
      type: type,
      remake: '附加说明，但是我什么都不想说了'

    }
  })
}
// 获取搜索联想建议
export const suggestDataApi = ({ keywords }) => {
  return test({
    url: '/v1_0/suggestion',
    params: {
      q: keywords
    }
  })
}
// 获取搜索结果
export const getSearchApi = ({ page = 1, per_page = 10, q }) => {
  return test({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
// 获取新闻详情页
export const detailApi = ({ art_id }) => {
  return test({
    url: `/v1_0/articles/${art_id}`
  })
}

// 文章详情->点击已关注即调用取消关注接口
export const unfollowApi = ({ autId }) => {
  return test({
    url: `/v1_0/user/followings/${autId}`,
    method: 'DELETE'
  })
}

// 文章详情--》点击关注-》已关注显示-》调用关注接口
export const followApi = ({ autId }) => {
  return test({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: autId
    }
  })
}
// 文章详情----》取消对文章点赞接口
export const unlikeApi = ({ autId }) => {
  return test({
    url: `/v1_0/article/likings/${autId}`,
    method: 'DELETE'
  })
}
// 文章详情---》对文章点赞接口
export const likeAPi = ({ autId }) => {
  return test({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: autId
    }
  })
}
// 文章详情下的评论---》获取评论接口
export const commentDateAPi = ({ id, offset = null, limit = 10 }) => {
  return test({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id,
      offset,
      limit
    }
  })
}

// 点击小红心，就是不喜欢，----》对文章不喜欢接口
export const dislikeDataApi = ({ artId }) => {
  return test({
    url: `/v1_0/comment/likings/${artId}`,
    method: 'DELETE'

  })
}

// 点击小灰心，就是喜欢----》调用喜欢接口
export const likeDataApi = ({ artId }) => {
  return test({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}
// 对文章进行评论--->发布评论
export const toCmtDataApi = ({ artId, content, art_id = null }) => {
  const obj = {
    target: artId,
    content
  }
  if (art_id != null) {
    obj.art_id = art_id
  }
  return test({
    // 1.axios中，data请求体传参，如果值为null是不会忽略这个参数的
    // 也会把参数名和值携带给后天（只有params遇到Null才会忽略）
    /*
      2.形参art_id可选参数，如果逻辑页面是对文章评论，则不需要传递art_id
      所以这时，内部art_id值为null就证明此次调用，是针对文章评论
      data请求体对象需要自己处理

    */
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
// 个人中心--》获取用户自己的信息就是用户页面，有粉丝，有动态的那个
export const getUserMsgApi = () => {
  return test({
    url: '/v1_0/user'
  })
}
// 个人中心--》获取用户的个人的资料（在个人中心里的编辑资料里）
export const getProfileMsgApi = () => {
  return test({
    url: '/v1_0/user/profile'
  })
}
// 用户---更新头像
export const updataUserPhotoApi = (fd) => {
  return test({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd // fd外面一会儿传进来的new FormDate()表单对象

  })
}
/*
上面接口概述：
如果你的请求题直接是FormDate表单对象，你也不用自己添加
Content_type ,axios发现数据请求题是表单对象，它也不会转换成json字符串
也不代表Content—Type:application/json ,而是交给浏览器，浏览器发现请求体是formData自己会携带Content-Type

Content-Type :aplication/json ;axios 携带的，前提：data请求体是对象-》json字符串-》发给后天
Content_Type:multipart/form-data;浏览器携带的，前提：data请求体必须是FormDate类型对象

*/

// 编辑用户的个人资料 （名称的修改）

export const updataUserProfileApi = (dataObj) => {
// 判断，有值才能参数名给后台，无值参数名不携带
// 写法一：解构赋值，4个判断，往空对象上添加有值的加上去（以前做过）
// 写法二：外面想传几个对象key+value ，就直接交给后台
// 写法三:上面写法不够语义化,我看不出obj里有什么
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete obj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return test({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
