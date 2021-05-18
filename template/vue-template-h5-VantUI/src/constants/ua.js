// 判断终端的运行环境

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const PF = inBrowser && navigator.platform
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && /firefox\/(\d+)/.test(UA)
export const isPC = /Win32|Win64|MacPPC|MacIntel|X11|Linux i686/.test(PF)
export const isMobile = !isPC // 移动端： 包括app的原生端和app的浏览器端
export const isApp = (isMobile && isIOS) || (isMobile && isAndroid)
