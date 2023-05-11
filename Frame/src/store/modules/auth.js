//import axios from 'axios'
//import jwtInterceptor from '../../shared/jwt.interceptor'
import VueCookies from 'vue-cookies'

const state = () => ({
  loginApiStatus: '',
  userProfile: localStorage.getItem('user'),
  token: VueCookies.get('token'),
  isAuthenticated: false,
  logOut: false,
})

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus
  },
  getToken(state) {
    return state.token
  },
  getUserProfile(state) {
    return state.userProfile
  },
  getLogout(state) {
    return state.logOut
  },
}
const actions = {
  async loginApi({ commit }, data) {
    console.log(data)
    const configObject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }

    await fetch('https://rassmin.com/api/User/Login', configObject)
      .then((response) => response.json())
      .then(async (loginData) => {
        console.log(loginData)
        if (loginData.success == true) {
          commit('setLoginApiStatus', 'success')
          localStorage.setItem('role', 'admin')
          localStorage.setItem('isAuthenticated', true)
          commit('setIsAuthenticated', true)
          VueCookies.set('token', loginData.data.token, '600s')

          await fetch(
            `https://rassmin.com/api/User/GetUsers?email=${data.email}`,
            {
              method: 'GET',
              headers: {
                'Content-type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${loginData.data.token}`,
              },
            },
          )
            .then(async (response) => await response.json())
            .then((userData) => {
              console.log(userData)
              localStorage.setItem('user', JSON.stringify(userData.data[0]))
              commit('setUserProfile', JSON.stringify(userData.data[0]))
            })
        } else {
          commit('setLoginApiStatus', 'failed')
          localStorage.setItem('role', '')
          localStorage.setItem('isAuthenticated', false)
          commit('setIsAuthenticated', false)
          VueCookies.set('token', '', '')
        }
      })
  },

  async userLogout({ commit }, token) {
    fetch('https://rassmin.com/api/User/Logout', {
      method: 'Get',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
    commit('setLogout', true)
    localStorage.setItem('isAuthenticated', 'false')
    localStorage.setItem('role', '')
    VueCookies.set('token', '', '')
    localStorage.setItem('user', '')
  },
}

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data
  },
  setIsAuthenticated(state, data) {
    state.isAuthenticated = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUserProfile(state, data) {
    state.userProfile = data
  },
  setLogout(state, payload) {
    state.logOut = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
