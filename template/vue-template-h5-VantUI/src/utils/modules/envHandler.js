import { NODE_ENV_IS_PRODUCTION } from '@/config'

export function envHandler (prod, dev) {
  if (NODE_ENV_IS_PRODUCTION) {
    return typeof prod === 'function' ? prod() : prod
  } else {
    return typeof dev === 'function' ? dev() : dev
  }
}
