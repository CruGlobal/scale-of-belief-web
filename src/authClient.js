'use strict'

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'

export default (type, params) => {
    switch (type) {
      case AUTH_LOGIN: {
        const { username, password } = params
        const authenticationUrl = 'https://thekey.me/cas'
        const oauthPath = '/api/oauth/ticket'
        let serviceParameter = '?service=' + encodeURIComponent(process.env.SERVICE_URL)

        const request = new Request(authenticationUrl + oauthPath + serviceParameter, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.THE_KEY_ACCESS_TOKEN
          })
        })

        return fetch(request).then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText)
          }
          return response.json()
        }).then((token) => {
          //TODO: Send token to the API to get back the JWT
        })

        return Promise.resolve()
      }
      case AUTH_LOGOUT: {
        break
      }
      case AUTH_ERROR: {
        const status  = params.message.status
        if (status === 401 || status === 403) {
            return Promise.reject()
        }
        return Promise.resolve()
      }
      case AUTH_CHECK: {
        break
      }
      default: {
        return Promise.reject('Unknown method')
      }
    }
}