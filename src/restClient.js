import {
  GET_ONE,
  GET_LIST,
  CREATE,
  UPDATE,
  HttpError
} from 'admin-on-rest'
import { stringify } from 'query-string'
const _extends2 = require('babel-runtime/helpers/extends')
const _extends3 = _interopRequireDefault(_extends2)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

const API_URL = process.env.REACT_APP_API_URL

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
  let url = ''
  const sessionToken = sessionStorage.getItem('sessionToken')
  const options = {}
  options.headers = new Headers({ Accept: 'application/json' })
  options.user = {
    authenticated: true,
    token: 'Bearer ' + sessionToken
  }

  switch (type) {
    case GET_ONE: {
      const query = {
        uri: params.id,
        guid: params.id
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case GET_LIST: {
      if (!params.filter['q'] && resource !== 'api-users') {
        // short-circuit
        return {}
      }
      const query = {
        uri: JSON.stringify(params.filter['q'])
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case CREATE:
    case UPDATE: {
      url = `${API_URL}/${resource}`
      options.method = 'POST'

      let json
      if (params.data.user) {
        json = {
          guid: params.data.id,
          contact_email: params.data.user.contact_email,
          api_pattern: params.data.user.api_pattern,
          type: params.data.user.type
        }
      } else if (params.data.score) {
        json = {
          uri: params.data.id,
          score: params.data.score
        }
      }

      options.body = JSON.stringify(json)
      break
    }
    default: {
      throw new Error(`Unsupported fetch action type ${type}`)
    }
  }
  return { url, options }
}

// This is the same as the fetchUtils fetchJson except for how it handles 404 errors
const fetchJson = (url, options) => {
  var requestHeaders = options.headers || new Headers({
    Accept: 'application/json'
  })
  if (!requestHeaders.has('Content-Type') && !(options && options.body && options.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token)
  }

  return fetch(url, (0, _extends3.default)({}, options, { headers: requestHeaders })).then(function (response) {
    return response.text().then(function (text) {
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text
      }
    })
  }).then(function (_ref) {
    var status = _ref.status,
      statusText = _ref.statusText,
      headers = _ref.headers,
      body = _ref.body

    var json = void 0
    try {
      json = JSON.parse(body)
    } catch (e) {
      // not json, no big deal
    }
    if (status !== 404 && (status < 200 || status >= 300)) {
      return Promise.reject(new HttpError.default(json && (json.message || statusText), status, json))
    }
    return { status: status, headers: headers, body: body, json: json }
  })
}

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      if (response.status && response.status === 404) {
        return {
          data: [],
          total: 0
        }
      }
      const { json } = response
      return {
        data: json.map((x) => {
          // This is the case for /content which brings back an array of strings
          if (typeof x === 'string') {
            return {
              id: x
            }
          }
          return {
            id: x.uri || x.guid,
            score: x.score,
            user: x
          }
        }),
        total: json.length
      }
    }
    default:
      const { json } = response
      return {
        data: {
          id: json.uri || json.guid,
          score: json.score,
          user: json
        }
      }
  }
}

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const { url, options } = convertRESTRequestToHTTP(type, resource, params)

  if (!url) {
    return Promise.resolve({ data: [], total: 0 })
  }
  return fetchJson(url, options)
    .then(response => convertHTTPResponseToREST(response, type, resource, params))
}
