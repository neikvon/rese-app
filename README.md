# Rese App

Node.js application framework with RESTful api

## Usage

```bash
npm i -S rese-app
```

```js
import ReseApp from 'rese-app'
import configs from './configs'

const app = new ReseApp(configs, [
  // middlewares
])

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
```

### Sample `configs.js`

```js
export default {

  server: {
    port: process.env.NODE_ENV === 'development' ? 0 : 9000
  },

  db: {
    type: 'mongodb',
    host: '127.0.0.1',
    port: '27017',
    database: 'your-database-name',
    username: 'your-username',
    password: 'your-password'
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
    Person: ...
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
```

## Test
`GET` `http://localhost:3000/api/city`

`POST` `http://localhost:3000/api/city`

`PUT` `http://localhost:3000/api/city/:id`

`DELETE` `http://localhost:3000/api/city/:id`