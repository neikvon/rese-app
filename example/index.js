const app = require('./app')
const path = require('path')
const koaStatic = require('koa-static')

// static serve
app.use(koaStatic(path.join(__dirname, 'static')))

// start server
app
  .start()
  .then(port => {
    // success
    app.logger.info(`App starting on http://localhost:${port}`)
  })
  .catch(err => {
    // fail
    app.logger.error(err)
  })