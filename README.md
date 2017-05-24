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
    port: process.env.NODE_ENV === 'development' ? 3000 : 9000
  },

  db: {
    type: 'mongodb', // or 'mysql'
    host: '127.0.0.1',
    port: '27017',
    database: 'your-database-name',
    username: 'your-username',
    password: 'your-password',
    // mongodb
    // ref: http://mongoosejs.com/docs/guide.html
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
        ...
      },
      ...
    },

    // OR mysql
    // ref: http://docs.sequelizejs.com/en/v3/docs/models-definition/
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
      ...
    }
  },

  router: {
    prefix: 'api'
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

### `new ReseApp(configs, [middlewares]`
- `configs`: `{Object}` required
- `middlewares`: `{Array}` optional, middleware functions

### `app.logger`
Instance of node-log4js
- `app.logger.trace()`
- `app.logger.debug()`
- `app.logger.info()`
- `app.logger.warn()`
- `app.logger.error()`
- `app.logger.fatal()`
> See more: https://github.com/nomiddlename/log4js-node

### `app.router`
Instance of koa-router
> See more: https://github.com/alexmingoia/koa-router
### `app.models`

Models defined in `config.js` `schema`, each one is a instance of mongoose model (MongoDB) or sequelize model (MySQL)
> See more:
>
> http://mongoosejs.com/docs/queries.html
>
> http://docs.sequelizejs.com/en/v3/api/model/

### `app.services`
All registered services

### `app.addService(name, options)`
- `name`: `{String}` required, service name
- `options`: `{Object}` required, service options
    - `path`: `{String}` required
    - `method`: `{String}` optional，default: get
    - `prefix`: `{String}` optional，default: router.prefix
    - `controller`: `{Object}` required
      - `fn`: `{Function}` required

### `app.hookService(name, options)`
- `name`: `{String|Array}` optional, one/some/all service
- `options`: `{Object}` required
    - `pre`: `{Function}` optional
    - `post`: `{Function}` optional

## Test
- GET: `curl http://localhost:3000/api/city`
- POST: `curl -i -H "Accept: application/json" -X POST -d "name=ny&totalPopulation=2000" http://localhost:3000/api/city`
- PUT: `curl -i -H "Accept: application/json" -X PUT -d "totalPopulation=2200" http://localhost:3000/api/city/11`
- DELETE: `curl -i -H "Accept: application/json" -X DELETE http://localhost:3000/api/city/11`

## Examples
https://github.com/neikvon/rese-app/tree/master/example

## Links
- Rese-api: https://github.com/neikvon/rese-api

## Changelog

**2017-05-24 14:00**
- Upgrade [rese-api](https://www.npmjs.com/package/rese-api)  to v0.0.6.

**2017-03-29 15:13**
- Upgrade [rese-api](https://www.npmjs.com/package/rese-api)  to v0.0.2.
