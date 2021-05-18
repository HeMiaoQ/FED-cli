const { API } = require('./PROXY_API')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? '././' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/style/base.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: API[process.env.NODE_ENV],
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    deletePreloadPrefetch(config)
    copyStaticToDist(config)
    setMetaVersion(config)
    addVConsole(config)
    addHtmlVersionCheck(config)
  }
}

function deletePreloadPrefetch (config) {
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')
}

function copyStaticToDist (config) {
  if (!require('fs').existsSync(require('path').resolve(__dirname, 'static'))) {
    return
  }

  config.plugin('copy').tap(args => {
    args[0].push({
      from: require('path').resolve(__dirname, 'static'),
      to: require('path').resolve(__dirname, 'dist/static'),
      toType: 'dir'
    })
    return args
  })
}

function setMetaVersion (config) {
  config.plugin('html').tap(args => {
    args[0].version = require('./package.json').version
    return args
  })
}

function addVConsole (config) {
  config.plugin('vConsole').use(require('vconsole-webpack-plugin'), [{ enable: isDev }])
}

function addHtmlVersionCheck (config) {
  config.plugin('HtmlVersionCheck').use(require('html-version-check-webpack-plugin'), [{ enable: !isDev }])
}
