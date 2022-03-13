(function (window) {
  var environments = {
    development: 'development',
    production: 'production'
  }

  var host = 'http://localhost:8080'

  // cấu hình port gọi api local
  var configDevLocal = host

  // cấu hình gọi api production
  var configProduct = ''

  var api = {
    development: configDevLocal
  }

  var configs = {
    development: {
      api: api.development
    }
  }

  var currentEnv = environments.development
  window.__env = window.__env || {}
  window.__env = configs[currentEnv]
})(this)
