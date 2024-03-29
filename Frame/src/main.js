import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import VueCookies from 'vue-cookies'

import VueTheMask from 'vue-the-mask'

const app = createApp(App)
app.use(VueTheMask)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueCookies)
app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
