import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '@/config'
import store from '@/store'
import { SHOW_TOAST } from '@/utils'

export function requestSuccessFunc (req) {
  // eslint-disable-next-line
  CONSOLE_REQUEST_ENABLE && console.info('requestSuccess', '\n', req)
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
  // ...
  _createLoading(req)
  return req
}

export function requestFailFunc (err) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  // ...
  _destroyLoading(err)
  return Promise.reject(err)
}

export function responseSuccessFunc (res) {
  // eslint-disable-next-line
  CONSOLE_RESPONSE_ENABLE && console.info('responseSuccess', '\n', res)
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // ...
  __responseSuccessHandler(res)
  _destroyLoading(res)
  return res
}

export function responseFailFunc (err) {
  // 响应失败，可根据 err.message 和 err.response 来做监控处理
  const { message, response } = err
  // eslint-disable-next-line
  CONSOLE_RESPONSE_ENABLE && console.info('responseFail', '\n', `message: ${message}`, '\n', response)
  __responseFailHandler(err)
  _destroyLoading(err)
  return Promise.reject(err)
}

function __responseSuccessHandler (res) {
  const { config, data } = res
  const { isOpenErrorIntercept } = config.options
  const { resultCode, errorCode, errorDesc } = data
  if (!isOpenErrorIntercept) return
  if (+resultCode !== 1) {
    SHOW_TOAST(`${errorCode}:${errorDesc}`)
  }
}

function __responseFailHandler (res) {
  const { config, message } = res
  const { isOpenErrorIntercept } = config.options
  if (!isOpenErrorIntercept) return
  if (message === 'timeout of 60000ms exceeded' || message === 'Network Error') {
    networkErrorHandler()
  } else {
    SHOW_TOAST(message)
  }
}

const requestList = []
let loadingTimer = null
let loadingStatus = false

function _createLoading (req) {
  const { url } = req
  const { loadingIntercept, loadingDelayTime } = req.options

  if (!loadingIntercept) return

  const requestListItem = { url }
  requestList.push(requestListItem)

  if (!loadingStatus) {
    loadingTimer = setTimeout(() => {
      store.dispatch('UPDATE_LOADING_STATUS', true)
    }, loadingDelayTime)
    loadingStatus = true
  }
}

function _destroyLoading (res) {
  const { url } = res.config
  removeRequestListItem(url)

  if (!requestList.length) {
    clearTimeout(loadingTimer)
    store.dispatch('UPDATE_LOADING_STATUS', false)
    loadingStatus = false
  }
}

function networkErrorHandler () {
  store.dispatch('UPDATE_NET_STATUS', true)
  setTimeout(() => {
    store.dispatch('UPDATE_NET_STATUS', false)
  }, 3000)
}

function removeRequestListItem (url) {
  const index = requestList.findIndex(item => item.url === url)
  if (index !== -1) {
    requestList.splice(index, 1)
  }
}
