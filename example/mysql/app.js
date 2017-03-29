const path = require('path')
const ReseApp = require('../../lib/index')
const configs = require('./configs')
const services = require('./services/index')
const koaStatic = require('koa-static')

const app = new ReseApp(configs, [
  // middlewares
  koaStatic(path.join(__dirname, 'static')),
])

// register services
services(app)

module.exports = app