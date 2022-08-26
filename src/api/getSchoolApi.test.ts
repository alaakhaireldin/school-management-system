import { schoolService } from '../lib/school/school.service'
import { fakeSchool } from '../test/school.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './getSchoolApi'

const getTestCase = (schoolId: string) => handler(getHttpEvent({ pathParameters: { id: schoolId } }), getFakeContext({}))
const fakeSchoolId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  schoolService.getSchool = jest.fn(async () => fakeSchool)
})

test('When given wrong school id', async () => {
  schoolService.getSchool = jest.fn(async () => undefined)
  const result = await getTestCase(fakeSchoolId)
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `${fakeSchoolId} does not exist` }) })
  expect(schoolService.getSchool).toHaveBeenCalledTimes(1)
})
