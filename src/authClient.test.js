/* global sessionStorage */
import { AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'
import authClient, { oktaAuthClient } from './authClient'

const futureJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjQyNDgzNTQ5OTk5fQ.DJI5Gx73hrueIQFi_FAZhTgUj4cRXSumJTySkcbgGYc'
const pastJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjQyNDY3fQ.Lh-B5ehegw4KXRki62b-vDgPkdEfG-PSeIDpVQuAfgg'

beforeEach(() => {
  jest.clearAllMocks()
})
describe('Logout', () => {
  it('should remove the session token from session storage', done => {
    oktaAuthClient.isAuthenticated = jest.fn(() => Promise.resolve(true))
    oktaAuthClient.signOut = jest.fn()

    authClient(AUTH_LOGOUT, {}).then(() => {
      expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1)
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('sessionToken')
      expect(oktaAuthClient.signOut).toHaveBeenCalledTimes(1)
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
  const mockApiResponse = {
    status: 200,
    json: jest.fn(() => {
      return Promise.resolve(futureJwt)
    })
  }

  it('should use the existing session token if it is still valid', done => {
    sessionStorage.getItem.mockReturnValueOnce(futureJwt)
    oktaAuthClient.signInWithRedirect = jest.fn(() => Promise.resolve())

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(0)
      expect(oktaAuthClient.signInWithRedirect).not.toHaveBeenCalled()
      done()
    })
  })

  it('should remove the existing session token if it is expired', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
    oktaAuthClient.getAccessToken = jest.fn(() => 'accessToken')
    oktaAuthClient.signInWithRedirect = jest.fn(() => Promise.resolve())

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.getItem.mock.calls.length).toEqual(1)
      expect(sessionStorage.getItem.mock.calls[0][0]).toEqual('sessionToken')
      expect(sessionStorage.removeItem.mock.calls.length).toEqual(1)
      expect(sessionStorage.removeItem.mock.calls[0][0]).toEqual('sessionToken')
      done()
    })
  })

  it('should successfully set a new session token if authenticating', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(pastJwt)
    oktaAuthClient.getAccessToken = jest.fn(() => 'accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(mockApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {
      expect(sessionStorage.setItem.mock.calls.length).toEqual(1)
      expect(sessionStorage.setItem.mock.calls[0][0]).toEqual('sessionToken')
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
    oktaAuthClient.getAccessToken = jest.fn(() => 'accessToken')

    global.fetch
      .mockReturnValueOnce(Promise.resolve(failedApiResponse))

    authClient(AUTH_CHECK, {}).then(() => {}, (error) => {
      expect(error).toBeDefined()
      expect(error.message).toEqual(failedApiResponse.statusText)
      done()
    })
  })

  it('should redirect to Okta if there is no access token set', done => {
    sessionStorage.getItem
      .mockReturnValueOnce(null)
    oktaAuthClient.getAccessToken = jest.fn(() => null)
    oktaAuthClient.signInWithRedirect = jest.fn(() => Promise.resolve())

    authClient(AUTH_CHECK, {}).then(() => {}, () => {
      expect(oktaAuthClient.signInWithRedirect).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
