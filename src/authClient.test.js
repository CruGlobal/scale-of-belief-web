/* global sessionStorage */
import { AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'
import authClient from './authClient'

const futureJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjQyNDgzNTQ5OTk5fQ.DJI5Gx73hrueIQFi_FAZhTgUj4cRXSumJTySkcbgGYc'
const pastJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjQyNDY3fQ.Lh-B5ehegw4KXRki62b-vDgPkdEfG-PSeIDpVQuAfgg'

beforeEach(() => {
  jest.clearAllMocks()
})
describe('Logout', () => {
  it('should remove the access token from session storage', done => {
    authClient(AUTH_LOGOUT, {}).then(() => {
      expect(sessionStorage.removeItem.mock.calls[0][0]).toEqual('accessToken')
      done()
    })
  })

  it('should remove the session token from session storage if it exists', done => {
    authClient(AUTH_LOGOUT, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls[1][0]).toEqual('sessionToken')
      done()
    })
  })

  it('should not remove the session token from session storage if it does not exist', done => {
    sessionStorage.getItem.mockReturnValueOnce(null)
    authClient(AUTH_LOGOUT, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      done()
    })
  })

  it('should redirect to the CAS logout endpoint', done => {
    authClient(AUTH_LOGOUT, {}).then(() => {
      expect(window.location.href).toEqual(process.env.REACT_APP_KEY_URL + '/logout')
      done()
    })
  })
})

describe('Error', () => {
  it('should throw an error if unauthorized', done => {
    let params = {
      message: {
        status: 401,
        message: 'Unauthorized'
      }
    }
    authClient(AUTH_ERROR, params).then(() => {}, (error) => {
      expect(error).toBeDefined()
      expect(error.status).toEqual(401)
      expect(error.message).toEqual('Unauthorized')
      expect(error.body).toEqual(params.message)
      done()
    })
  })

  it('should throw an error if forbidden', done => {
    let params = {
      message: {
        status: 403,
        message: 'Forbidden'
      }
    }
    authClient(AUTH_ERROR, params).then(() => {}, (error) => {
      expect(error).toBeDefined()
      expect(error.status).toEqual(403)
      expect(error.message).toEqual('Forbidden')
      expect(error.body).toEqual(params.message)
      done()
    })
  })

  it('should resolve if not unauthorized', done => {
    let params = {
      message: {
        status: 500,
        message: 'Internal Server Error'
      }
    }
    authClient(AUTH_ERROR, params).then(() => {
      done()
    })
  })
})

describe('Auth Check', () => {
  const serviceTicket = 'ST-something'

  const mockCasResponse = {
    status: 200,
    json: jest.fn(() => {
      return { ticket: serviceTicket }
    })
  }

  const mockApiResponse = {
    status: 200,
    json: jest.fn(() => {
      return futureJwt
    })
  }

  it('should use the existing session token if it is still valid', done => {
    sessionStorage.getItem.mockReturnValueOnce(futureJwt)

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(0)
      done()
    })
  })

  it('should remove the existing session token if it is expired', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
      .mockReturnValueOnce('accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockCasResponse))
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls.length).toEqual(2)
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(2)
      expect(sessionStorage.removeItem.mock.calls[0][0]).toEqual('sessionToken')
      done()
    })
  })

  it('should successfully set a new session token if authenticating', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
      .mockReturnValueOnce('accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockCasResponse))
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.setItem.mock.calls.length).toEqual(1)
      expect(sessionStorage.setItem.mock.calls[0][1]).toEqual(futureJwt)
      done()
    })
  })

  it('should successfully remove an outdated access token', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
      .mockReturnValueOnce('accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockCasResponse))
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls.length).toEqual(2)
      expect(sessionStorage.getItem.mock.calls[1][0]).toEqual('accessToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(2)
      expect(sessionStorage.removeItem.mock.calls[1][0]).toEqual('accessToken')
      done()
    })
  })

  it('should fail if the call to CAS fails', done => {
    let failedCasResponse = {
      status: 401,
      statusText: 'Unauthorized'
    }

    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
      .mockReturnValueOnce('accessToken')

    global.fetch.mockReturnValueOnce(Promise.resolve(failedCasResponse))

    authClient(AUTH_CHECK, {}).then(() => {}, (error) => {
      expect(error).toBeDefined()
      expect(error.message).toEqual(failedCasResponse.statusText)
      done()
    })
  })

  it('should fail if the call to the API fails', done => {
    let failedApiResponse = {
      status: 401,
      statusText: 'Unauthorized'
    }

    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
      .mockReturnValueOnce('accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockCasResponse))
      .mockReturnValueOnce(Promise.resolve(failedApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {}, (error) => {
      expect(error).toBeDefined()
      expect(error.message).toEqual(failedApiResponse.statusText)
      done()
    })
  })

  it('should not try to remove an existing session token if it does not exist', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockCasResponse))
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls.length).toEqual(2)
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(1)
      expect(sessionStorage.removeItem.mock.calls[0][0]).toEqual('accessToken')
      done()
    })
  })

  it('should redirect to CAS if there is no access token set', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)

    authClient(AUTH_CHECK, {}).then(() => {}, (error) => {
      expect(window.location.href).toEqual(
        process.env.REACT_APP_KEY_URL + '/login' +
            '?response_type=token' +
            '&client_id=' + process.env.REACT_APP_KEY_CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(window.location.origin) +
            '&scope=fullticket')
      expect(error).toBeDefined()
      done()
    })
  })
})
