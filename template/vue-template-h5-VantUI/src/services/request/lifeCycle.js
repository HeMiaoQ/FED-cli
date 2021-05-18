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

  isNotAllowMultipleRequest && requestQueuePush(requestItem)
  return true
}

export async function requestReturn (requestItem) {
  const { isNotAllowMultipleRequest } = requestItem.options
  try {
    const res = await axiosInstance(requestItem)
    isNotAllowMultipleRequest && requestQueueSplice(requestItem)
    return res
  } catch (err) {
    isNotAllowMultipleRequest && requestQueueSplice(requestItem)
    throw err
  }
}
