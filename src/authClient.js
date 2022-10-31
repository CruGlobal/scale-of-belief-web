/* global sessionStorage, fetch */
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'
import HttpError from './HttpError'
import jwtDecode from 'jwt-decode'
import { OktaAuth } from '@okta/okta-auth-js'

export const oktaAuthClient = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  scopes: ['openid', 'email', 'profile', 'offline_access'],
  tokenManager: {
    // sessionStorage doesn't exist in Node, so switch to memory storage during testing
    storage: typeof jest === 'undefined' ? 'sessionStorage' : 'memory'
  },
  devMode: window.location.host.startsWith('localhost') && typeof jest === 'undefined'
})

// Automatically refresh access tokens using the refresh token if it expires
oktaAuthClient.start()

// Check the validity of the session token and regenerate it if necessary
export async function authCheck () {
  if (oktaAuthClient.isLoginRedirect()) {
    // Extract the authorization code from the login redirect URL
    await oktaAuthClient.handleLoginRedirect()
  }

  const sessionToken = sessionStorage.getItem('sessionToken')
  if (sessionToken) {
    const session = jwtDecode(sessionToken)
    const isExpired = (new Date().getTime() / 1000) - session.exp >= 0

    if (!isExpired) {
      return
    }

    sessionStorage.removeItem('sessionToken')
  }

  const accessToken = oktaAuthClient.getAccessToken()
  if (!accessToken) {
    await oktaAuthClient.signInWithRedirect({
      originalUri: window.location.href
    })

    let json = {
      status: 401,
      message: 'Unauthorized'
    }
    throw new HttpError(json.message, json.status, json)
  }

  // get JWT from API
  return fetch(process.env.REACT_APP_API_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      access_token: accessToken
    })
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText)
    }
    return response.json()
  }).then((response) => {
    // save session JWT to sessionStorage
    sessionStorage.setItem('sessionToken', response)
  })
}

export default async (type, params) => {
  switch (type) {
    case AUTH_LOGIN: {
      return
    }
    case AUTH_LOGOUT: {
      if (await oktaAuthClient.isAuthenticated()) {
        sessionStorage.removeItem('sessionToken')
        return oktaAuthClient.signOut({
          clearTokensBeforeRedirect: true
        })
      }
      return
    }
    case AUTH_ERROR: {
      const status = params.message.status
      if (status === 401 || status === 403) {
        return Promise.reject(new HttpError(params.message.message, params.message.status, params.message))
      }
      return Promise.resolve()
    }
    case AUTH_CHECK: {
      // admin-on-rest immediately starts rendering, even if we return a promise that eventually
      // rejects. Instead of being able to delay rendering in AUTH_CHECK until we verify and
      // asynchronously refresh the session token if necessary, we instead have to introduce that
      // delay in restClient.js
      // https://github.com/marmelab/admin-on-rest/blob/980a73f474a5bd87a717da2cb6f2fd8aaef1b8f7/src/auth/Restricted.js#L43-L53
      return
    }
    default: {
      let json = {
        status: 500,
        message: 'Unknown method'
      }
      return Promise.reject(new HttpError(json.message, json.status, json))
    }
  }
}
