/* global sessionStorage, Headers */
import {
  GET_ONE,
  GET_LIST,
  CREATE,
  UPDATE,
  fetchUtils
} from 'admin-on-rest'
import { stringify } from 'query-string'

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
        uri: JSON.stringify(params.filter['q']),
        page: params.pagination['page'],
        per_page: params.pagination['perPage']
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case CREATE:
    case UPDATE: {
      url = `${API_URL}/${resource}`
      options.method = 'POST'

      let json
      if (params.data.score) {
        json = {
          uri: params.data.id,
          score: params.data.score
        }
      } else if (params.data.user) {
        json = {
          guid: params.data.id,
          contact_email: params.data.user.contact_email,
          api_pattern: params.data.user.api_pattern,
          type: params.data.user.type
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

      let listData = json
      if (json.data) {
        listData = json.data
      }

      let total = json.length
      if (json.meta && json.meta.total) {
        total = parseInt(json.meta.total, 10)
      }

      return {
        data: listData.map((x) => {
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
        total: total
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
  const { fetchJson } = fetchUtils

  if (!url) {
    return Promise.resolve({ data: [], total: 0 })
  }
  return fetchJson(url, options)
    .then(response => convertHTTPResponseToREST(response, type, resource, params))
}
