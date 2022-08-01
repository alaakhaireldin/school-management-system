import { APIGatewayEvent, Context } from 'aws-lambda'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  console.log({ event, context })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  }
}
