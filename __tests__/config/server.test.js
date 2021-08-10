require('dotenv').config()
const pkg = require('../../package.json')
const request = require('supertest')
const createServer = require('../../src/config/server')

const configServer = {
  port: process.env.SERVER_PORT || 3003,
  endPointVersion: process.env.ENDPOINT_VERSION || '/v1/',
  version: pkg.version || '0.0.1'
}

const server = createServer(configServer)
const httpServer = server.test()


describe('Testing the api of server', () => {
  
  test('Should get the main route', async done => {
    const res = await request(httpServer)
      .get('/v1/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('message')
        done()
      })
      .catch(err => done(err))
  })
})
