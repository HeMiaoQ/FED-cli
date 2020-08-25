const ROOT_VALUE = 75

export function calcRem (pxValue) {
  return `${pxValue / ROOT_VALUE}rem`
}
