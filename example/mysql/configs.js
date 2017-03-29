const pkg = require('../../package.json')

module.exports = {

  server: {
    port: process.env.NODE_ENV === 'development' ? 3000 : 9000
  },

  db: {
    type: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'fast-rest',
    username: 'root',
    password: '123456'
  },

  router: {
    prefix: 'api'
  },

  schema: {
    City: {
      name: {
        type: 'STRING',
        allowNull: false,
        defaultValue: ''
      },
      totalPopulation: {
        type: 'BIGINT',
        allowNull: false,
      },
      country: {
        type: 'STRING'
      }
    },
    Person: {
      name: {
        type: 'STRING',
        allowNull: false,
      },
      age: {
        type: 'INTEGER',
        allowNull: false,
      },
    },
    Resource: {
      md5: {
        type: 'STRING',
        allowNull: false,
      },
      size: {
        type: 'INTEGER',
      },
      name: {
        type: 'STRING'
      },
    },
    Category: {
      name: {
        type: 'STRING',
        allowNull: false,
      },
      valid: {
        type: 'INTEGER',
        allowNull: false,
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