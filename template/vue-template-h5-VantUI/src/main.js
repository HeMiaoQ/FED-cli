import Vue from 'vue'

import injectComponents from '@/components/inject'

import api from '@/services/api'
import { axiosInstance } from '@/services/request/lifeCycle'
import constants from '@/constants/config'
import request from '@/services/request'
import utils from '@/utils/config'
import callNative from '@/utils/callNative'
import { GLOBAL_AXIOS_ENABLE, GLOBAL_REQUEST_ENABLE, GLOBAL_API_ENABLE, GLOBAL_CONSTANTS_ENABLE, GLOBAL_UTILS_ENABLE } from '@/config'

import router from '@/router'
import store from '@/store'
import App from '@/App'
import 'lib-flexible'

Vue.use(injectComponents)
Vue.use(injectInstanceProperty)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

function inject (Vue, name, module) {
  Object.defineProperty(Vue.prototype, name, {
    get () {
      return module
    }
  })
}

function injectInstanceProperty (Vue) {
  GLOBAL_AXIOS_ENABLE && inject(Vue, '$axios', axiosInstance)
  GLOBAL_REQUEST_ENABLE && inject(Vue, '$request', request)
  GLOBAL_API_ENABLE && inject(Vue, '$api', api)
  GLOBAL_CONSTANTS_ENABLE && inject(Vue, '$constants', constants)
  GLOBAL_UTILS_ENABLE && inject(Vue, '$utils', utils)
  inject(Vue, '$callNative', callNative)
}
