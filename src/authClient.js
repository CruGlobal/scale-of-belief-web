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
      if (oktaAuthClient.isLoginRedirect()) {
        // Extract the authorization code from the login redirect URL
        return oktaAuthClient.handleLoginRedirect()
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

      const serviceUrl = process.env.REACT_APP_SERVICE_URL
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
      return fetch(serviceUrl, {
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
    default: {
      let json = {
        status: 500,
        message: 'Unknown method'
      }
      return Promise.reject(new HttpError(json.message, json.status, json))
    }
  }
}
