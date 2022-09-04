import { schoolService } from '../lib/school/school.service'
import { fakeSchool } from '../test/school.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './deleteSchoolApi'

const getTestCase = (schoolId: string) => handler(getHttpEvent({ pathParameters: { id: schoolId } }), getFakeContext({}))
const fakeSchoolId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  schoolService.getSchool = jest.fn(async () => undefined)
  schoolService.deleteSchool = jest.fn(async () => true)
})

test('When given wrong id', async () => {
  const result = await getTestCase(fakeSchoolId)
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `${fakeSchoolId} does not exist` }) })
  expect(schoolService.deleteSchool).toHaveBeenCalledTimes(0)
})
