import { APIGatewayEvent, Context } from 'aws-lambda'

import { SchoolDbModel, schoolService } from '../lib/school/school.service'
import { isObjectEmpty } from '../lib/util/object.util'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  // console.log({ event, context })
  const schoolId = event.pathParameters!.id!
  const body: Partial<Pick<SchoolDbModel, 'schoolType' | 'region' | 'schoolName'>> = JSON.parse(event.body!)
  if (!body || isObjectEmpty(body)) {
    return { statusCode: 400, body: JSON.stringify({ message: `Must attach schools details to the request` }) }
  }
  console.log(body)
  await schoolService.updateSchool(schoolId, body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'School Updated',
    }),
  }
}
