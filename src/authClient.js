'use strict'

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest'

export default (type, params) => {
    switch (type) {
      case AUTH_LOGIN: {
        break
      }
      case AUTH_LOGOUT: {
        break
      }
      case AUTH_ERROR: {
        break
      }
      case AUTH_CHECK: {
        break
      }
      default: {
        return Promise.reject('Unknown method')
      }
    }
}