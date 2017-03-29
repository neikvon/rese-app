const pkg = require('../../package.json')

module.exports = {

  server: {
    port: process.env.NODE_ENV === 'development' ? 3000 : 9000
  },

  db: {
    type: 'mongodb',
    host: '127.0.0.1',
    port: '27017',
    database: 'fast-rest',
    username: 'shaw',
    password: 123456
  },

  router: {
    prefix: 'api'
  },

  schema: {
    City: {
      name: {
        type: String,
        required: [true, 'name required'],
      },
      totalPopulation: {
        type: Number,
        required: [true, 'totalPopulation required'],
      },
      country: String,
      zipCode: Number,
    },
    Person: {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
    },
    Resource: {
      md5: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      name: String,
    },
    Category: {
      name: {
        type: String,
        required: true,
      },
      valid: {
        type: Number,
        required: true,
      },
    }
  },

  logs: {
    // config for log4js
    config: {
      appenders: [{
        type: 'console'
      }, {
        type: 'dateFile',
        filename: 'log',
        pattern: '_yyyy-MM-dd.log',
        alwaysIncludePattern: true,
      }]
    },
    // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
    level: process.env.NODE_ENV === 'production' ? 'WARN' : 'TRACE',
  }
}