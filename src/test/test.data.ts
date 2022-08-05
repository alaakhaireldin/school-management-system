import { APIGatewayEvent, APIGatewayEventRequestContext, Context, CustomAuthorizerEvent } from 'aws-lambda'

export interface HttpEventsArgs {
  body?: object | null
  headers?: { [name: string]: string }
  httpMethod?: string
  path?: string
  pathParameters?: { [name: string]: string | Array<any> } | null
  stageVariables?: { [name: string]: string } | null
  queryStringParameters?: { [name: string]: string } | null
  multiValueQueryStringParameters?: { [name: string]: string[] }
  multiValueHeaders?: { [name: string]: string[] }
  requestContext?: any
  resource?: string
  isBase64Encoded?: boolean
}
export const getHttpEvent = ({
  body = null,
  headers = {},
  isBase64Encoded = false,
  httpMethod = '',
  path = '/',
  pathParameters = null,
  queryStringParameters = null,
  multiValueHeaders = { headers: [] },
  multiValueQueryStringParameters = { params: [] },
  stageVariables = null,
  requestContext = {},
  resource = '',
}: HttpEventsArgs): APIGatewayEvent => ({
  body: body ? JSON.stringify(body) : null,
  headers,
  isBase64Encoded,
  httpMethod,
  path,
  pathParameters: pathParameters as any,
  queryStringParameters,
  multiValueHeaders,
  multiValueQueryStringParameters,
  stageVariables,
  requestContext,
  resource,
})

export const getFakeContext = (args: {
  awsRequestId?: string
  callbackWaitsForEmptyEventLoop?: boolean
  functionName?: string
  functionVersion?: string
  invokedFunctionArn?: string
  logGroupName?: string
  logStreamName?: string
  memoryLimitInMB?: string
}): Context => ({
  awsRequestId: args.awsRequestId ? args.awsRequestId : '',
  callbackWaitsForEmptyEventLoop: args.callbackWaitsForEmptyEventLoop ? args.callbackWaitsForEmptyEventLoop : false,
  functionName: args.functionName ? args.functionName : '',
  functionVersion: args.functionVersion ? args.functionVersion : '',
  invokedFunctionArn: args.invokedFunctionArn ? args.invokedFunctionArn : '',
  logGroupName: args.logGroupName ? args.logGroupName : '',
  logStreamName: args.logStreamName ? args.logStreamName : '',
  memoryLimitInMB: args.memoryLimitInMB ? args.memoryLimitInMB : '',
  done: () => ({}),
  fail: () => ({}),
  succeed: () => ({}),
  getRemainingTimeInMillis: () => 0,
})

export const getCustomAuthEvent = (args: {
  type?: string
  methodArn?: string
  authorizationToken?: string
  resource?: string
  path?: string
  httpMethod?: string
  headers?: { [name: string]: string }
  multiValueHeaders?: { [name: string]: string[] }
  pathParameters?: { [name: string]: string } | null
  queryStringParameters?: { [name: string]: string } | null
  multiValueQueryStringParameters?: { [name: string]: string[] } | null
  stageVariables?: { [name: string]: string }
  requestContext?: APIGatewayEventRequestContext
  domainName?: string
  apiId?: string
}): CustomAuthorizerEvent => ({
  type: args.type ? args.type : '',
  methodArn: args.methodArn ? args.methodArn : '',
  authorizationToken: args.authorizationToken ? args.authorizationToken : '',
  resource: args.resource ? args.resource : '',
  path: args.path ? args.path : '',
  httpMethod: args.httpMethod ? args.httpMethod : '',
  headers: args.headers ? args.headers : {},
  multiValueHeaders: args.multiValueHeaders ? args.multiValueHeaders : {},
  pathParameters: args.pathParameters ? args.pathParameters : {},
  queryStringParameters: args.queryStringParameters ? args.queryStringParameters : {},
  multiValueQueryStringParameters: args.multiValueQueryStringParameters ? args.multiValueQueryStringParameters : {},
  stageVariables: args.stageVariables ? args.stageVariables : {},
  requestContext: args.requestContext ? args.requestContext : ({} as APIGatewayEventRequestContext),
  domainName: args.domainName ? args.domainName : '',
  apiId: args.apiId ? args.apiId : '',
})

export const getFakeCallBack = () => {}
