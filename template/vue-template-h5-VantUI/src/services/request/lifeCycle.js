import axios from 'axios'

import { AXIOS_DEFAULT_CONFIG } from '@/config'
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from './interceptor'
import { requestQueuePush, requestQueueSplice, checkAllowMultipleRequest } from './utils'

// 注入默认配置
export const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export function requestStart (requestItem) {
  const { isNotAllowMultipleRequest } = requestItem.options

  if (isNotAllowMultipleRequest && !checkAllowMultipleRequest(requestItem)) {
    return false
  }

  requestQueuePush(requestItem)
  return true
}

export async function requestReturn (requestItem) {
  try {
    const res = await axios(requestItem)
    requestQueueSplice(requestItem)
    return res
  } catch (err) {
    requestQueueSplice(requestItem)
    throw err
  }
}
