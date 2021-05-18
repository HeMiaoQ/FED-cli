export const requestQueue = []

export function requestQueuePush (requestItem) {
  requestQueue.push(requestItem)
}

export function requestQueueSplice (requestItem) {
  const { removeRequestDelayTime } = requestItem.options
  if (removeRequestDelayTime) {
    setTimeout((data) => {
      requestQueue.splice(requestQueue.findIndex(item => item.url === data.url), 1)
    }, removeRequestDelayTime, requestItem)
  } else {
    requestQueue.splice(requestQueue.findIndex(item => item.url === requestItem.url), 1)
  }
}

export function getRequestParamsKey (item) {
  return item.method === 'get' ? 'params' : 'data'
}

export function checkAllowMultipleRequest (requestItem) {
  const { multipleRequestGapTime } = requestItem.options

  const sameRequestItemList = requestQueue.filter(item => {
    const sameUrl = item.url === requestItem.url
    const sameParams = JSON.stringify(item[getRequestParamsKey(item)]) === JSON.stringify(requestItem[getRequestParamsKey(requestItem)])
    return sameUrl && sameParams
  })

  requestItem.__requestStartTime__ = new Date()

  if (multipleRequestGapTime === undefined || multipleRequestGapTime === -1) {
    if (sameRequestItemList.length) {
      return false
    }
  } else {
    const lastSameRequestItem = sameRequestItemList.slice(-1)[0]
    if (lastSameRequestItem && requestItem.__requestStartTime__ - lastSameRequestItem.__requestStartTime__ < multipleRequestGapTime) {
      return false
    }
  }

  return true
}
