import { APIGatewayEvent, Context } from 'aws-lambda'

import { SCHOOL_TYPE, schoolService } from '../lib/school/school.service'
import { isObjectEmpty } from '../lib/util/object.util'

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  console.log(event.body)

  const body: { schoolName: string; schoolType: SCHOOL_TYPE } = JSON.parse(event.body!)

  if (!body || isObjectEmpty(body)) {
    return { statusCode: 400, body: JSON.stringify({ message: `Must attach body to the request` }) }
  }
  const schoolId = await schoolService.createSchool(body)
  return { statusCode: 200, body: JSON.stringify({ schoolId }) }
}
