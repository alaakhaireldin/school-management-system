import { SchoolDbModel, schoolService } from '../lib/school/school.service'
import { fakeSchool, fakeSchoolId } from '../test/school.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './patch.school.api'

const updatePayload: Pick<SchoolDbModel, 'schoolName' | 'schoolType' | 'region'> = {
  schoolName: fakeSchool.schoolName,
  schoolType: fakeSchool.schoolType,
  region: fakeSchool.region,
}

const getTestCase = (body?: Partial<SchoolDbModel>) => {
  return handler(getHttpEvent({ body, pathParameters: { id: fakeSchoolId } }), getFakeContext({}))
}

beforeEach(() => {
  schoolService.updateSchool = jest.fn(async () => true)
})

test.only('When given wrong id', async () => {
  schoolService.updateSchool = jest.fn(async () => false)
  const result = await getTestCase(updatePayload)
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `this id does not exist` }) })
  expect(schoolService.updateSchool).toHaveBeenCalledTimes(1)
})

test('When given empty body', async () => {
  const result = await getTestCase({})
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
  expect(schoolService.updateSchool).toHaveBeenCalledTimes(0)
})

test('When schoolType is not public nor private', async () => {
  const result = await getTestCase({ schoolName: fakeSchool.schoolName, region: fakeSchool.region, schoolType: 'local' as any })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" must be one of [private, public]` }) })
  expect(schoolService.updateSchool).toHaveBeenCalledTimes(0)
})

test('When given less than one key in body', async () => {
  const result = await getTestCase({})
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must have at least 1 key` }) })
  expect(schoolService.updateSchool).toHaveBeenCalledTimes(0)
})
