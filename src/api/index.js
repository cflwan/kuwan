import { test } from '@/utils/request'

// export const allItem = () => {
//   return axios({
//     url: '/v1_0/channels',
//     method: 'GET' // 可以写也可以不写 在request里已经写了默认的参数

//   })
// }

// 获取用户的频道
import { getToken } from '@/utils/token.js' // 导入封装的token

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
    url: '/v1_0/user/channels',
    // 这可以不写,有默认值
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
// 获取文章新闻推荐
export const getallartcalListApi = ({ channel_id, timestamp }) => {
  return test({
    url: '/v1_0/articles',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    params: {
      channel_id,
      timestamp
    }
  })
}
