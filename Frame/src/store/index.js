import { createStore } from 'vuex'
import authModule from '../store/modules/auth'

export default createStore({
  state: {
    elementCountInBasket: 0,
    isSearchActive: false,
    adminSideBarOpen: true,
    searchInputData: '',
  },
  getters: {
    getAdminSideBarState(state) {
      return state.adminSideBarOpen
    },
    getSearchInputData(state) {
      return state.searchInputData
    },
  },
  mutations: {
    setSearchInputData(state, data) {
      state.searchInputData = data
    },
    setTotalQuantityInBasket(state, data) {
      state.elementCountInBasket = data
    },
    setAdminSideBarActive(state) {
      state.adminSideBarOpen = !state.adminSideBarOpen
    },
    setChangeBarState(state) {
      state.isSearchActive = !state.isSearchActive
    },
  },
  actions: {},
  modules: { auth: authModule },
})
