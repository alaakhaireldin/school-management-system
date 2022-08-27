import { APIGatewayEvent, Context } from 'aws-lambda'

import { schoolService } from '../lib/school/school.service'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const schoolId = event.pathParameters!.id!

  const deleteResult = await schoolService.deleteSchool(schoolId)
  if (!deleteResult) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'This school id does not exit',
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'School deleted',
    }),
  }
}
