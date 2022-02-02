import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import jobs from './modules/jobs'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersistedState({ storage: sessionStorage })],
  state: {  },
  mutations: {  },
  actions: {  },
  modules: { auth,user,jobs  }
})
