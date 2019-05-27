import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post'
import user from './modules/users'
import common from './modules/common'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      post,
      user,
      common
    }
  })