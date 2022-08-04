import { APIGatewayEvent, Context } from 'aws-lambda'
import * as Joi from 'joi'

import { SchoolDbModel, schoolService } from '../lib/school/school.service'
import { isObjectEmpty } from '../lib/util/object.util'

const schema = Joi.object().keys({
  schoolName: Joi.string().min(3).max(30),
  region: Joi.string().min(3).max(30),
  schoolType: Joi.object().keys({
    id: Joi.string().valid('private', 'public').required(),
  }),
})
export const handler = async (event: APIGatewayEvent, context: Context) => {
  // console.log({ event, context })
  const schoolId = event.pathParameters!.id!
  const body: Partial<Pick<SchoolDbModel, 'schoolType' | 'region' | 'schoolName'>> = JSON.parse(event.body!)
  if (!body || isObjectEmpty(body)) {
    return { statusCode: 400, body: JSON.stringify({ message: `Must attach schools details to the request` }) }
  }
  // console.log(body)
  const result = schema.validate(body)
  if (result.error) {
    return { statusCode: 404, body: JSON.stringify({ message: `${result.error.message}` }) }
  } else {
    console.log(result)
  }
  await schoolService.updateSchool(schoolId, body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Update done',
    }),
  }
}
