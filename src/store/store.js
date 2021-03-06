import Vue from 'vue'
import Vuex from 'vuex'
import { employeeList } from '@/store/modules/employeeList'
import { departmentList } from '@/store/modules/departmentList'
import { auth } from '@/store/modules/auth'
import { userAuthentication } from '@/store/modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null
  },
  getters: {},
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    }
  },
  actions: {},
  modules: {
    employeeList,
    departmentList,
    auth,
    userAuthentication
  }
})
