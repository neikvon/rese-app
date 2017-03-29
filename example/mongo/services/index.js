const cityService = require('../services/city')
const resourceService = require('../services/resource')

module.exports = app => {

  cityService(app)
  resourceService(app)

  // hook all services
  app.hookService({
    async pre(ctx) {
      // console.log('this is common pre fn')
    },
    post(ctx, data) {
      // console.log('this is common post fn')
    }
  })
}