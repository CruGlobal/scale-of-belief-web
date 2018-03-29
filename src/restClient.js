import {
    GET_ONE,
    GET_LIST,
    CREATE,
    fetchUtils,
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
  const options = {}
  options.headers = new Headers({ Accept: 'application/json' })

  switch (type) {
    case GET_ONE: {
      const query = {
        uri: JSON.stringify(params.filter['q'])
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case GET_LIST: {
      const query = {
        uri: JSON.stringify(params.filter['q'])
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case CREATE: {
      url = `${API_URL}/${resource}`
      options.method = 'POST'
      options.body = JSON.stringify(params.data)
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
  const { json } = response

  switch (type) {
    case GET_LIST:
      return {
        data: json.map((x) => {
          return {
            id: x.uri,
            score: x.score
          }
        }),
        total: json.length
      }
    default:
      return { data: json }
  }
}

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils
  const { url, options } = convertRESTRequestToHTTP(type, resource, params)
  return fetchJson(url, options).then(response => convertHTTPResponseToREST(response, type, resource, params))
}
