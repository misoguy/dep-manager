import { ApolloLink, from, execute, Observable, toPromise } from 'apollo-link'
import gql from 'graphql-tag'

import { link as debug, __set__ as __set__debug__ } from './debug'
import { link as auth, __set__ as __set__auth__ } from './auth'

expect.extend({
  contextContaining: (received, compare) => {
    const clone = { ...compare }

    // improve testing UI.
    compare.toString = () => JSON.stringify(compare)

    const pass = expect
      .objectContaining(clone)
      .asymmetricMatch(received.getContext())

    if (pass) {
      return {
        message: () => `expected ${received} not to be divisible by teste`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be divisible by teste`,
        pass: false
      }
    }
  }
})

describe('api/github/link', () => {
  beforeEach(jest.clearAllMocks)

  const spies = { empty: jest.fn(() => Observable.of(null)) }
  // @ts-ignore
  const links = { empty: new ApolloLink(spies.empty) }

  describe('debug', () => {
    it('should log operation and variables', async () => {
      const link = from([debug, links.empty])
      const variables = { arg: 'value' }
      const query = gql`
        query NAME {
          field
        }
      `

      const log = jest.fn()
      __set__debug__('debug', log)

      await toPromise(execute(link, { query, variables }))

      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith(expect.anything(), 'NAME', variables)
    })
  })

  describe('auth', () => {
    it('should do nothing when no headers available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = { graphqlContext: {} }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)
      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({ graphqlContext: {} })
      )
      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.not.contextContaining({ graphqlContext: { headers: {} } })
      )
    })

    it('should do nothing when no authorization header is available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = { graphqlContext: { headers: { name: 'value' } } }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({
          graphqlContext: { headers: { name: 'value' } }
        })
      )

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.not.contextContaining({
          graphqlContext: { headers: { authorization: 'token' } }
        })
      )
    })

    it('should inject authorization header when available', async () => {
      const link = from([auth, links.empty])

      const query = gql`
        query NAME {
          field
        }
      `

      const context = {
        graphqlContext: { headers: { authorization: 'token' } }
      }
      await toPromise(execute(link, { query, context }))

      expect(spies.empty).toHaveBeenCalledTimes(1)

      expect(spies.empty).toHaveBeenCalledWith(
        // @ts-ignore
        expect.contextContaining({
          graphqlContext: { headers: { authorization: 'token' } }
        })
      )
    })
  })
})
