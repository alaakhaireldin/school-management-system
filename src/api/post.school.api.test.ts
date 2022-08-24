import { schoolService } from '../lib/school/school.service'
import { getUuid } from '../lib/util/string.util'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './post.school.api'

const getTestCase = (body?: object) => handler(getHttpEvent({ body }), getFakeContext({}))
const fakeSchoolId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  schoolService.createSchool = jest.fn(async () => fakeSchoolId)
})
const fakeSchoolName = 'English School'
const fakeRegion = 'north'
const fakeSchoolType = 'public'

test('When given no body', async () => {
  const result = await getTestCase()
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
})

test('When schoolType is not public nor private', async () => {
  const result = await getTestCase({ schoolName: fakeSchoolName, region: fakeRegion, schoolType: 'local' })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" must be one of [private, public]` }) })
})

test('When given no "schoolName"', async () => {
  const result = await getTestCase({ region: fakeRegion, schoolType: fakeSchoolType })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolName" is required` }) })
})
test('when given no "region"', async () => {
  const result = await getTestCase({ schoolName: fakeSchoolName, schoolType: fakeSchoolType })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"region" is required` }) })
})

test('When given no "schoolType"', async () => {
  const result = await getTestCase({ schoolName: fakeSchoolName, region: fakeRegion })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" is required` }) })
})

test('When given wrong key', async () => {
  const result = await getTestCase({ schoolName: fakeSchoolName, region: fakeRegion, schoolType: 'private', value: '' })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" is not allowed` }) })
})

test('When given the right payload', async () => {
  const result = await getTestCase({ schoolName: fakeSchoolName, region: fakeRegion, schoolType: 'private' })
  expect(schoolService.createSchool).toHaveBeenCalledTimes(1)
  expect(schoolService.createSchool).toHaveBeenCalledWith({ schoolName: fakeSchoolName, region: fakeRegion, schoolType: 'private' })
  expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ schoolId: fakeSchoolId }) })
})
