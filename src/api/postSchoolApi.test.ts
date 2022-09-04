import { SchoolDbModel, schoolService } from '../lib/school/school.service'
import { getUuid } from '../lib/util/string.util'
import { fakeSchool, fakeSchoolId } from '../test/school.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './postSchoolApi'

const getTestCase = (body?: object) => handler(getHttpEvent({ body }), getFakeContext({}))

beforeEach(() => {
  schoolService.createSchool = jest.fn(async () => fakeSchoolId)
})
const Payload: Pick<SchoolDbModel, 'schoolName' | 'schoolType' | 'region'> = {
  schoolName: fakeSchool.schoolName,
  schoolType: fakeSchool.schoolType,
  region: fakeSchool.region,
}

test('When given no body', async () => {
  const result = await getTestCase()
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
})

test('When schoolType is not public nor private', async () => {
  const result = await getTestCase({ schoolName: fakeSchool.schoolName, region: fakeSchool.region, schoolType: 'local' as any })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" must be one of [private, public]` }) })
})

test('When given no "schoolName"', async () => {
  const result = await getTestCase({ region: fakeSchool.region, schoolType: fakeSchool.schoolType })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolName" is required` }) })
})
test('when given no "region"', async () => {
  const result = await getTestCase({ schoolName: fakeSchool.schoolName, schoolType: fakeSchool.schoolType })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"region" is required` }) })
})

test('When given no "schoolType"', async () => {
  const result = await getTestCase({ schoolName: fakeSchool.schoolName, region: fakeSchool.region })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" is required` }) })
})

test('When given wrong key', async () => {
  const result = await getTestCase({ schoolName: fakeSchool.schoolName, region: fakeSchool.region, schoolType: 'private', value: '' })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" is not allowed` }) })
})

test('When given the right payload', async () => {
  const result = await getTestCase(Payload)
  expect(schoolService.createSchool).toHaveBeenCalledTimes(1)
  expect(schoolService.createSchool).toHaveBeenCalledWith(Payload)
  expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ schoolId: fakeSchoolId }) })
})
