import { APIGatewayEvent, Context } from 'aws-lambda'

import { schoolService } from '../lib/school/school.service'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const schoolId = event.pathParameters!.id!
  const schoolDetails = await schoolService.getSchool(schoolId)
  if (!schoolDetails) return { statusCode: 404, body: JSON.stringify({ message: `${schoolId} does not exist` }) }
  await schoolService.deleteSchool(schoolId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'School deleted',
    }),
  }
}
