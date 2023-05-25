import { createStore } from 'vuex'
import authModule from '../store/modules/auth'

export default createStore({
  state: {
    elementCountInBasket: 0,
    isSearchActive: false,
    adminSideBarOpen: true,
  },
  getters: {
    getAdminSideBarState(state) {
      return state.adminSideBarOpen
    },
  },
  mutations: {
    setTotalQuantityInBasket(state) {
      if (localStorage.getItem('GalleryItems') != null) {
        state.elementCountInBasket = JSON.parse(
          localStorage.getItem('GalleryItems'),
        ).reduce((accumulator, object) => {
          return accumulator + object.quantity
        }, 0)
      }
    },
    setAdminSideBarActive(state) {
      state.adminSideBarOpen = !state.adminSideBarOpen
    },
  },
  actions: {},
  modules: { auth: authModule },
})
