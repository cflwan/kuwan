// 封装axios
import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 20000
})
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
