require('dotenv').config()
const { sign, verify, auth } = require('../utils/jwt')

const user = {
  name: 'tester',
  email: 'tester@tester.com'
}

describe('Testing the authentication module', () => {
  test('Should return a token', done => {
    const token = sign(user)
    expect(token).toBeTruthy()
    done()
  })
  test('Shoud return the values decoded of token', () => {
    const token = sign(user)
    const values = verify(token)

    expect(values).toHaveProperty('name', user.name)
    expect(values).toHaveProperty('email', user.email)
    expect(values).toHaveProperty('exp')
  })
})