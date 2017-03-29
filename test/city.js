import app from '../example/app'
import supertest from 'supertest'
import test from 'ava'

const request = supertest.agent(app.listen(0))
const model = '/api/city'
let tmp = {}

test.serial('POST ' + model, async t => {
  await request
    .post(model)
    .send({
      name: '新疆',
      totalPopulation: 300
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
      totalPopulation: 500
    })
    .expect(200)
    .expect(res => {
      if (res.body.code !== 0) {
        t.fail(`code: ${res.body.code}, msg: ${res.body.msg}`)
      }

      if (!res.body.data) {
        t.fail('not found')
      }

      if (res.body.data.totalPopulation !== 500) {
        t.fail('totalPopulation change fail')
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

test('POST ' + model + ' should fail without name', async t => {
  await request
    .post(model)
    .send({
      totalPopulation: 2000
    })
    .expect(200)
    .expect(res => {
      if (res.body.code === 0) {
        t.fail()
      }
    })
})

test('POST ' + model + ' should fail without totalPopulation', async t => {
  await request
    .post(model)
    .send({
      name: '西藏',
    })
    .expect(200)
    .expect(res => {
      if (res.body.code === 0) {
        t.fail()
      }
    })
})

test.serial('POST ' + model + ' should fail if name exist', async t => {
  await request
    .post(model)
    .send({
      name: '新疆',
      totalPopulation: 2000
    })
    .expect(200)
    .expect(res => {
      if (res.body.code === 0) {
        t.fail()
      }
    })
})