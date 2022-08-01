import { APIGatewayEvent, Context } from 'aws-lambda'

import { schoolService } from '../lib/school/school.service'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const user = schoolService.getUser('abc')
  console.log({ event, context })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  }
}
