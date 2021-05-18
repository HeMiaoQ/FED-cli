import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { routerBeforeEachFunc, routerAfterEachFunc } from './interceptor'

Vue.use(Router)

const routerPush = Router.prototype.push

Router.prototype.push = (location) => {
  return routerPush.call(this, location).catch(err => err)
}

// 注入默认配置和路由表
const routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes
})

routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)

export default routerInstance
