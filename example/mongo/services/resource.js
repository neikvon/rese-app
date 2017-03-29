module.exports = app => {

  app.hookService('resource.add', {
    async pre(ctx) {
      const md5 = ctx.request.body.md5
      const data = await app.models.Resource.findOne({
        md5
      })
      if (data) {
        throw new Error(`md5 '${md5}' already exist`)
      }
    },
  })

}