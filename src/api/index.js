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
