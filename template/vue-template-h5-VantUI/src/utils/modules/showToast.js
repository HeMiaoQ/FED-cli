import { Notify } from 'vant'

const SUCCESS = 'success'
const FAILURE = 'failure'
const WARNING = 'warning'
const COLOR_MAP = {
  [SUCCESS]: '#44DB5E',
  [FAILURE]: '#FE3824',
  [WARNING]: '#44DB5E'
}

export function showToast (message, { type } = { type: FAILURE }, container = 'app') {
  if (![SUCCESS, FAILURE, WARNING].includes(type)) return
  Notify({ message, background: COLOR_MAP[type] })
}
