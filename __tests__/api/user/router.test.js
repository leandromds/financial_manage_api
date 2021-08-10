const request = require('supertest')
const httpServer = require('../_HttpServer')
const UserServices = require('../../../src/routes/user/services')

const reqUser = {
	email: 'ramiro@yahoo.com',
	name: 'Ramiro Souza',
	password: '654321'
}

const user = {
  status: true,
  message: 'User register with success',
	user: {
    email: 'ramiro@yahoo.com',
    name: 'Ramiro Souza',
    password: '654321'
  },
  accessToken: 'token'
}

jest.setTimeout(30000);

describe('Test all routes of user resource', () => {
  afterAll(async done => {
    done()
  })

  test('Should register a user and return status code 200 and auth token', async done => {
    const registerSpy = jest.spyOn(UserServices, 'register')
    registerSpy.mockReturnValue({ user })

    await request(httpServer)
      .post('/v1/register')
      .send(reqUser)
      .then(res => {
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data.accessToken', 'token')
        done()
      })
      .catch(err => done(err))
  })
})
