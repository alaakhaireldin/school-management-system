import { APIGatewayEvent, Context } from 'aws-lambda'

import { schoolService } from '../lib/school/school.service'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const schoolId = event.pathParameters!.id!

  await schoolService.deleteSchool(schoolId)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'School deleted',
    }),
  }
}
