const ReseApp = require('../lib/index')
const configs = require('./configs')
const services = require('./services/index')

const app = new ReseApp(configs, [
  // middlewares
])

// register services
services(app)

module.exports = app