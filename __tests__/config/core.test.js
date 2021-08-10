const createCore = require('../../src/config/core')

describe('Testing the core application', () => {
  test('Should exists', () => {
    expect(createCore).toBeDefined()
  })

  test('Should be a function', () => {
    expect(typeof createCore).toBe('function')
  })

  test('Should return a object', () => {
    const core = createCore()
    expect(core).toBeDefined()
    expect(typeof core).toBe('object')
  })

  test('Should has a start function', () => {
    const core = createCore()
    expect(core.start).toBeDefined()
  })

  test('Should has a start function', () => {
    const core = createCore()
    expect(core.start).toBeDefined()
  })

  test('Should has a stop function', () => {
    const core = createCore()
    expect(core.stop).toBeDefined()
  })
})
