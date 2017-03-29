module.exports = app => {

  app.addService('city.shaw', {
    path: '/shaw', // required
    method: 'get', // optional，default: get
    prefix: 'cgi', // optional，default: router.prefix
    controller: { // required
      async fn(ctx) {
        const data = await app.models.City.findAll({
          limit: 2
        })
        return data
      }
    },
  })

  /*
    city.find
    city.findById
    city.add
    city.update
    city.delete
  */
  app.hookService('city.add', {
    // pre hook
    async pre(ctx) {
      const name = ctx.request.body.name
      const params = {
        where: {
          name
        }
      }

      const data = await app.models.City.findOne(params)
      if (data) {
        throw new Error(`${name} already exist`)
      }
    },

    // post hook
    post(ctx, data) {
      console.log(data)
    }
  })

}