const request = require('supertest')
const createServer = require('../src/config/server')

describe('Testing the server application', () => {
  test('Should exists', () => {
    expect(createServer).toBeDefined()
  })

  test('Should be a function', () => {
    expect(typeof createServer).toBe('function')
  })

  test('Should return a object', () => {
    const server = createServer()
    expect(server).toBeDefined()
    expect(typeof server).toBe('object')
  })

  test('Should has a start function', () => {
    const server = createServer()
    expect(server.start).toBeDefined()
  })

  test('Should has a stop function', () => {
    const server = createServer()
    expect(server.stop).toBeDefined()
  })
})

describe('Testing the api of server', () => {
  const configServer = {
    port: 3003,
    endPointVersion: '/v1/',
    version: '0.0.1'
  }
  const server = createServer(configServer)
  test('Should get the main route', async () => {
    const startedServer = await server.start()
    const res = await request(startedServer).get('/v1/')

    expect(res.body).toHaveProperty('message')
  })
})
