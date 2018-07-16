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
      let uri = params.id

      let protocolPosition = params.id.indexOf('://')
      if (protocolPosition > -1 && params.id.indexOf('%') === -1) {
        uri = handleEncoding(params.id)
      }

      const query = {
        uri: uri,
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

      let orderBy = params.sort['field']

      if (orderBy.startsWith('Score.')) {
        orderBy = orderBy.substring(6)
      }

      if (resource === 'api-users' && orderBy === 'id') {
        orderBy = 'guid'
      }

      if (orderBy === 'id') {
        orderBy = 'uri'
      }

      let uri = params.filter['q']

      if (resource !== 'api-users' && uri.indexOf('%') === -1) {
        uri = handleEncoding(uri)
      }

      const query = {
        uri: JSON.stringify(uri),
        page: params.pagination['page'],
        per_page: params.pagination['perPage'],
        order_by: orderBy,
        order: params.sort['order']
      }
      url = `${API_URL}/${resource}?${stringify(query)}`
      break
    }
    case CREATE:
    case UPDATE: {
      url = `${API_URL}/${resource}`
      options.method = 'POST'

      let json
      if (params.data.score !== undefined) {
        let uri = params.data.id

        if (uri.indexOf('%') === -1) {
          uri = handleEncoding(uri)
        }

        json = {
          uri: uri,
          score: params.data.score
        }
      } else if (params.data.user) {
        json = {
          guid: params.data.id,
          contact_email: params.data.user.contact_email,
          api_pattern: params.data.user.api_pattern,
          type: params.data.user.type || ''
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

const handleEncoding = function (original) {
  let protocolPosition = original.indexOf('://')
  let protocol = original.substring(0, protocolPosition + 3)
  let urlBody = original.substring(protocolPosition + 3)
  let pieces = urlBody.split('/')
  let encodedPieces = []

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i]
    // Handle the bulk of the URI encoding
    let encodedPiece = encodeURIComponent(piece)

    // These are for the differences between Java and Javascript URI encoding
    encodedPiece = encodedPiece.replace(/%2B/g, '+')
    encodedPiece = encodedPiece.replace(/\(/g, '%28')
    encodedPiece = encodedPiece.replace(/\)/g, '%29')
    encodedPiece = encodedPiece.toLowerCase()

    encodedPieces.push(encodedPiece)
  }

  return protocol + encodedPieces.join('/')
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
      if (json.meta && json.meta.total !== null && json.meta.total >= 0) {
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

          let uri = null
          if (x.uri) {
            uri = decodeURIComponent(x.uri)
          }
          return {
            id: uri || x.guid,
            score: x.score,
            user: x
          }
        }),
        total: total
      }
    }
    default:
      const { json } = response

      let uri = null
      if (json.uri) {
        uri = decodeURIComponent(json.uri)
      }
      return {
        data: {
          id: uri || json.guid,
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
