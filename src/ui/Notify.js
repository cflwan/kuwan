// import { Notify } from 'vant'
// export default Notify
// 基于vant 进行二次封装

import { Toast } from 'vant'
// 外面逻辑页面传入的字段，我用自定义函数结构赋值形参中的接受，因为toast 里面的形参有些不一样
// 内部如何使用和传值，在这个函数体里自己决定
export default ({ type, message }) => {
  if (type === 'danger') {
    type = 'fail'
  }
  Toast({
    type,
    message
  })
}
