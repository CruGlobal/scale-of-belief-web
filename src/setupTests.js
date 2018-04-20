const sessionStorageMock = {
  getItem: jest.fn((key) => {
    return key
  }),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
}
global.sessionStorage = sessionStorageMock

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'some url'
})
