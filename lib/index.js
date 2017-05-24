const Koa = require('koa')
const ReseApi = require('rese-api')
const bodyparser = require('koa-bodyparser')
const log4js = require('log4js')
const mError = require('./middlewares/error-handler')
const mRequest = require('./middlewares/request-log')

const initMiddlewares = Symbol()
const initServices = Symbol()

module.exports = class ReseApp extends Koa {

  constructor(cfgs, middlewares) {
    super()
    this.cfgs = cfgs

    // log4js config
    log4js.configure(cfgs.logs.config, {
      cwd: cfgs.logs.cwd || './logs'
    })
    global.logger = this.logger = log4js.getLogger()

    // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
    this.logger.setLevel(cfgs.logs.level || 'WARN')

    this[initMiddlewares](middlewares)
    this[initServices]()
  }

  [initMiddlewares](middlewares) {
    this.use(mError(this.logger))
    this.use(mRequest(this.logger))
    this.use(bodyparser())

    // addtions
    if (middlewares && middlewares.length) {
      middlewares.map(item => {
        this.use(item)
      })
    }
  }

  [initServices]() {
    this.apiService = new ReseApi(this, this.cfgs)
    this.models = this.apiService.models
    this.router = this.apiService.router
    this.services = this.apiService.services
  }

  start() {
    const port = this.cfgs.server.port || 3000
    return new Promise((resolve, reject) => {
      this.listen(port, err => err ? reject(err) : resolve(port))
    })
  }

  addService() {
    return this.apiService.add.apply(this.apiService, arguments)
  }

  hookService() {
    return this.apiService.hook.apply(this.apiService, arguments)
  }

}