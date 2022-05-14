// 此文件 封装三个方法 专门用于操作tokend的
// 封装点东西：目的：代码分层，更方便清晰，以后修改方便

const key = 'geek-itheima'
// key 就是数据的标识符即名字
// 设置
export const setToken = (token) => {
  return localStorage.setItem(key, token)
  // loaclstorage  获得的token值赋值给key标识符
}
// 获取
export const getToken = () => {
  return localStorage.getItem(key)
}
// 删除
export const removeToken = () => {
  return localStorage.removeItem(key)
}

/*
const key = 'yuntoutiao'

export const  setToken = (Token)=>{
  return localStorage.setItem(ket,Token)
}

export const getToken = ()=>{
 return  localStorage.getItem(key)
}

export const moveToken=()=>{
  retrurn loacalStorage.removeItem(key)
}
*/
