// 封装本地存储的方式
// 整个项目使用localStorage,seeionStorage,还是cookies
// 只需要改变这里即可
// 封装：为了统一管理，方便以后替换和修改
// token.js里的key是固定的，针对存储token设置的key标识符，
// 现在我们封装一个可以设置key标识符，更改存储本地存储的方式

export const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(key)
}
export const removeStorage = (key) => {
  return localStorage.removeItem(key)
}
