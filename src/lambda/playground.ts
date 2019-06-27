import { Handler } from 'aws-lambda'
import playground from 'graphql-playground-middleware-lambda'
import { GITHUB_OAUTH_TOKEN, REACT_APP_GRAPHQL_ENDPOINT } from '../config/env'

const headers: { [key: string]: string } = {}

if (!REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error(`You must define REACT_APP_GRAPHQL_ENDPOINT env in order to GraphQL Playground`)
}

// fulfil headers for Playground requests. Not strictly required, can be
// altered through the Playground Settings UI.
if (GITHUB_OAUTH_TOKEN) {
  headers.authorization = `bearer ${GITHUB_OAUTH_TOKEN}`
}

const handle = playground({ endpoint: REACT_APP_GRAPHQL_ENDPOINT, headers })

/**
 * Simple wrapper to avoid duplicated response (callback + return).
 */
const handler: Handler = (lambdaEvent, context, callback) => {
  handle(lambdaEvent, context, callback)
}

export { handler }
