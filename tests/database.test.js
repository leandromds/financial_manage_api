const createDatabase = require('../src/config/database')

describe('Testing the database application ', () => {
  test('Should exists', () => {
    expect(createDatabase).toBeDefined()
  })

  test('Should be a function', () => {
    expect(typeof createDatabase).toBe('function')
  })
})
