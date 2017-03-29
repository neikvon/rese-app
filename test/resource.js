import app from '../example/app'
import supertest from 'supertest'
import test from 'ava'

const request = supertest.agent(app.listen(0))
const model = '/api/resource'
let tmp = {}

test.serial('POST ' + model, async t => {
  await request
    .post(model)
    .send({
      md5: 'xxxxx',
      size: 300
    })
    .expect(200)
    .expect(res => {
      if (res.body.code !== 0) {
        t.fail(`code: ${res.body.code}, msg: ${res.body.msg}`)
      } else {
        tmp = res.body.data
      }
    })
})

test.serial('PUT ' + model, async t => {
  await request
    .put(`${model}/${tmp._id}`)
    .send({
      size: 500
    })
    .expect(200)
    .expect(res => {
      if (res.body.code !== 0) {
        t.fail(`code: ${res.body.code}, msg: ${res.body.msg}`)
      }

      if (!res.body.data) {
        t.fail('not found')
      }

      if (res.body.data.size !== 500) {
        t.fail('size change fail')
      }
    })
})

test.serial('GET ' + model, async t => {
  await request
    .get(model)
    .expect(200)
    .expect(res => {
      t.is(res.body.code, 0)
    })
})

test('DELETE ' + model, async t => {
  await request
    .delete(`${model}/${tmp._id}`)
    .expect(200)
    .expect(res => {
      if (res.body.code !== 0) {
        t.fail(`code: ${res.body.code}, msg: ${res.body.msg}`)
      }
    })
})

test('POST ' + model + ' should fail without md5', async t => {
  await request
    .post(model)
    .send({
      size: 2000
    })
    .expect(200)
    .expect(res => {
      if (res.body.code === 0) {
        t.fail()
      }
    })
})

test('POST ' + model + ' should fail without size', async t => {
  await request
    .post(model)
    .send({
      md5: 'yyyy',
    })
    .expect(200)
    .expect(res => {
      if (res.body.code === 0) {
        t.fail()
      }
    })
})

test.serial('POST ' + model + ' should fail if md5 exist', async t => {
  await request
    .post(model)
    .send({
      md5: 'xxxxx',
      size: 1000
    })
    .expect(200)
    .expect(res => {
      console.log(res.body)
      if (res.body.code === 0) {
        t.fail()
      }
    })
})