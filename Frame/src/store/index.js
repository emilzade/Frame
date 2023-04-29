import { createStore } from 'vuex'
import authModule from '../store/modules/auth'

export default createStore({
  state: {
    elementCountInBasket: 0,
    isSearchActive: false,
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
    changeSearchActiveState(state) {
      state.isSearchActive = !state.isSearchActive
    },
  },
  actions: {},
  modules: { auth: authModule },
})
