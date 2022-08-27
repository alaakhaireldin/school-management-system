import { APIGatewayEvent, Context } from 'aws-lambda'

import { SchoolDbModel, schoolService } from '../lib/school/school.service'
import { patchSchoolBodySchema } from '../lib/school/school.validation'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const schoolId = event.pathParameters!.id!
  const body: Partial<Pick<SchoolDbModel, 'schoolType' | 'region' | 'schoolName'>> = JSON.parse(event.body!)

  const result = patchSchoolBodySchema.validate(body)
  if (result.error) {
    return { statusCode: 400, body: JSON.stringify({ message: `${result.error.message}` }) }
  }

  const updated = await schoolService.updateSchool(schoolId, body)
  if (!updated) return { statusCode: 404, body: JSON.stringify({ message: 'this id does not exist' }) }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Update done',
    }),
  }
}
