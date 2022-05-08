import router from '@/router'
// 封装axios
import theAxios from 'axios'
import { Notify } from 'vant'
import { getToken } from './token'
const axios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
// 目标：统一携带token
// 判断本地有token在携带，判断具体api/index.js里如果没有携带Authorization,我在添加上去
// 未定义叫undefined,null具体的值你得赋予才叫空
// ？. 可选链操作符，如果前面对象里没有length,整个表达式原地返回undefined
// 如果getToken()在原地有值token字符串，才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // http响应状态吗4ｘｘ，５ｘｘ报错进入这里
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('/login')
  }
  // 不能使用this.$router(因为this不是Vue组件对象无法调用$router)
  // 解决：this.$router为了拿到router路由对象，所以直接在上面引入router
  return Promise.reject(error)
})
// 上面的拦截器必须在 下面代码的上面
// axios.request()整合数据
export const test = ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
// import {test} '@/utils/request'
// export const loginApi = () => {
//   return test({
//     url: '',
//     method: 'POST'
//   })
// }

// 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
//   return $.ajax({
//     url: url,
//     type: method,
//     data: data,
//     header: headers
//   })
// }
