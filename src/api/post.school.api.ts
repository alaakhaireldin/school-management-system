import { APIGatewayEvent, Context } from 'aws-lambda'

import { SCHOOL_TYPE, schoolService } from '../lib/school/school.service'
import { postSchoolBodySchema } from '../lib/school/school.validation'

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  const body: { schoolName: string; schoolType: SCHOOL_TYPE } = JSON.parse(event.body!)
  const result = postSchoolBodySchema.validate(body)
  if (result.error) {
    return { statusCode: 400, body: JSON.stringify({ message: `${result.error.message}` }) }
  }
  const schoolId = await schoolService.createSchool(body)
  return { statusCode: 200, body: JSON.stringify({ schoolId }) }
}
