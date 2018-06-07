import restClient from './restClient'
import {
  GET_ONE,
  GET_LIST,
  CREATE,
  UPDATE
} from 'admin-on-rest'

beforeEach(() => {
  jest.clearAllMocks()
})
describe('GET ONE', () => {
  describe('Score', () => {
    const uri = 'http://some.uri.com'

    it('should return a single score', done => {
      const params = {
        id: uri
      }

      const existingScore = {
        uri: uri,
        score: 10
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingScore))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'score', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(uri)
        expect(response.data.score).toEqual(existingScore.score)
        done()
      })
    })

    it('should return not found', done => {
      const params = {
        id: uri
      }

      const notFoundResponse = {
        message: 'Not Found'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(notFoundResponse))),
        status: 404,
        statusText: 'Not Found',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'score', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        id: uri
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'score', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })

  describe('Api User', () => {
    const guid = 'some-guid'

    it('should return a single API user', done => {
      const params = {
        id: guid
      }

      const existingUser = {
        guid: guid,
        contact_email: 'some.email@example.com',
        api_pattern: [
          '.*'
        ]
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingUser))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'api-user', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(guid)
        expect(response.data.user.contact_email).toEqual(existingUser.contact_email)
        expect(response.data.user.api_pattern).toEqual(existingUser.api_pattern)
        done()
      })
    })

    it('should return not found', done => {
      const params = {
        id: guid
      }

      const notFoundResponse = {
        message: 'Not Found'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(notFoundResponse))),
        status: 404,
        statusText: 'Not Found',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'api-user', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        id: guid
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_ONE, 'api-user', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })
})

describe('GET LIST', () => {
  describe('Scores', () => {
    it('should return a single result', done => {
      const params = {
        filter: {
          q: 'http://some-uri.com/one'
        }
      }

      const existingScores = [{
        uri: params.filter['q'],
        score: 5
      }]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingScores))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'scores', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingScores[0].uri)
        expect(response.data[0].score).toEqual(existingScores[0].score)
        done()
      })
    })

    it('should return multiple results', done => {
      const params = {
        filter: {
          q: 'http://some-uri.com'
        }
      }
      const existingScores = [
        {
          uri: params.filter['q'] + '/one',
          score: 7
        },
        {
          uri: params.filter['q'] + '/two',
          score: 3
        }
      ]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingScores))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'scores', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingScores[0].uri)
        expect(response.data[0].score).toEqual(existingScores[0].score)
        expect(response.data[1].id).toEqual(existingScores[1].uri)
        expect(response.data[1].score).toEqual(existingScores[1].score)
        done()
      })
    })

    it('should return no results', done => {
      const params = {
        filter: {
          q: 'http://nonexisting-uri.com'
        }
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify([]))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'scores', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data).toEqual([])
        done()
      })
    })
  })

  describe('Api Users', () => {
    it('should return a single result', done => {
      const params = { filter: {} }

      const existingUsers = [{
        guid: 'some-guid',
        contact_email: 'some.email@example.com',
        api_pattern: [
          '.*'
        ],
        type: 'super'
      }]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingUsers))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'api-users', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingUsers[0].guid)
        expect(response.data[0].user.contact_email).toEqual(existingUsers[0].contact_email)
        expect(response.data[0].user.api_pattern).toEqual(existingUsers[0].api_pattern)
        expect(response.data[0].user.type).toEqual(existingUsers[0].type)
        done()
      })
    })

    it('should return multiple results', done => {
      const params = { filter: {} }

      const existingUsers = [
        {
          guid: 'some-guid',
          contact_email: 'some.email@example.com',
          api_pattern: [
            '.*'
          ],
          type: 'super'
        },
        {
          guid: 'other-guid',
          contact_email: 'other.email@example.com',
          api_pattern: [
            '.*some-uri.*',
            '.*other-uri.*'
          ],
          type: ''
        }
      ]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingUsers))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'api-users', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingUsers[0].guid)
        expect(response.data[0].user.contact_email).toEqual(existingUsers[0].contact_email)
        expect(response.data[0].user.api_pattern).toEqual(existingUsers[0].api_pattern)
        expect(response.data[0].user.type).toEqual(existingUsers[0].type)
        expect(response.data[1].id).toEqual(existingUsers[1].guid)
        expect(response.data[1].user.contact_email).toEqual(existingUsers[1].contact_email)
        expect(response.data[1].user.api_pattern).toEqual(existingUsers[1].api_pattern)
        expect(response.data[1].user.type).toEqual(existingUsers[1].type)
        done()
      })
    })

    it('should return no results', done => {
      const params = { filter: {} }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify([]))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'api-users', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data).toEqual([])
        done()
      })
    })
  })

  describe('Unscored Content', () => {
    it('should return a single result', done => {
      const params = {
        filter: {
          q: 'http://some-uri.com/one'
        }
      }

      const existingUnscoredContent = [ params.filter['q'] ]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingUnscoredContent))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'content', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingUnscoredContent[0])
        done()
      })
    })

    it('should return multiple results', done => {
      const params = {
        filter: {
          q: 'http://some-uri.com'
        }
      }

      const existingUnscoredContent = [
        params.filter['q'] + '/one',
        params.filter['q'] + '/two'
      ]

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(existingUnscoredContent))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'content', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data[0].id).toEqual(existingUnscoredContent[0])
        expect(response.data[1].id).toEqual(existingUnscoredContent[1])
        done()
      })
    })

    it('should return no results', done => {
      const params = {
        filter: {
          q: 'http://unscored-uri.com/'
        }
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify([]))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(GET_LIST, 'content', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data).toEqual([])
        done()
      })
    })
  })
})

describe('CREATE', () => {
  describe('Score', () => {
    const uri = 'http://some.uri.com'
    const score = 6

    it('should create a new score', done => {
      const params = {
        data: {
          id: uri,
          score: score
        }
      }

      const newScore = {
        uri: uri,
        score: score
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(newScore))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(CREATE, 'score', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(uri)
        expect(response.data.score).toEqual(newScore.score)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        data: {
          id: uri,
          score: score
        }
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(CREATE, 'score', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })

  describe('Api User', () => {
    const guid = 'some-guid'
    const user = {
      contact_email: 'some.email@example.com',
      api_pattern: [
        '.*'
      ],
      type: 'super'
    }

    it('should create an API user', done => {
      const params = {
        data: {
          id: guid,
          user: user
        }
      }

      const newUser = {
        guid: guid,
        contact_email: user.contact_email,
        api_pattern: user.api_pattern,
        type: user.type
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(newUser))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(CREATE, 'api-user', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(guid)
        expect(response.data.user.contact_email).toEqual(newUser.contact_email)
        expect(response.data.user.api_pattern).toEqual(newUser.api_pattern)
        expect(response.data.user.type).toEqual(newUser.type)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        data: {
          id: guid,
          user: user
        }
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(CREATE, 'api-user', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })
})

describe('UPDATE', () => {
  describe('Score', () => {
    const uri = 'http://some.uri.com'
    const score = 2

    it('should update an existing score', done => {
      const params = {
        data: {
          id: uri,
          score: score
        }
      }

      const updatedScore = {
        uri: uri,
        score: score
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(updatedScore))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(UPDATE, 'score', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(uri)
        expect(response.data.score).toEqual(updatedScore.score)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        data: {
          id: uri,
          score: score
        }
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(UPDATE, 'score', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })

  describe('Api User', () => {
    const guid = 'some-guid'
    const user = {
      contact_email: 'some.email@example.com',
      api_pattern: [
        '.*'
      ],
      type: 'super'
    }

    it('should update an existing API user', done => {
      const params = {
        data: {
          id: guid,
          user: user
        }
      }

      const updatedUser = {
        guid: guid,
        contact_email: user.contact_email,
        api_pattern: user.api_pattern,
        type: user.type
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(updatedUser))),
        status: 200,
        statusText: 'OK',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(UPDATE, 'api-user', params).then((response) => {
        expect(response).toBeDefined()
        expect(response.data).toBeDefined()
        expect(response.data.id).toEqual(guid)
        expect(response.data.user.contact_email).toEqual(updatedUser.contact_email)
        expect(response.data.user.api_pattern).toEqual(updatedUser.api_pattern)
        expect(response.data.user.type).toEqual(updatedUser.type)
        done()
      })
    })

    it('should return unauthorized', done => {
      const params = {
        data: {
          id: guid,
          user: user
        }
      }

      const unauthorizedResponse = {
        message: 'Unauthorized'
      }

      const mockApiResponse = {
        text: jest.fn(() => Promise.resolve(JSON.stringify(unauthorizedResponse))),
        status: 401,
        statusText: 'Unauthorized',
        headers: {}
      }

      global.fetch.mockReturnValueOnce(Promise.resolve(mockApiResponse))

      restClient(UPDATE, 'api-user', params).then(() => {}, (error) => {
        expect(error.message).toEqual(mockApiResponse.statusText)
        expect(error.status).toEqual(mockApiResponse.status)
        done()
      })
    })
  })
})
