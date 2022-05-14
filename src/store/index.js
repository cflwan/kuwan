import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    userphoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202111%2F10%2F20211110174351_d2491.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655028424&t=de055c73e702fa86832bd05eba2d5d53'
  },
  getters: {

  },
  mutations: {
    SET_USERPHOTO (state, value) {
      state.userphoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
