const app = require('./app')
const path = require('path')

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