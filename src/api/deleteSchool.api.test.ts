import { schoolService } from '../lib/school/school.service'
import { fakeSchool } from '../test/school.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './deleteSchoolApi'

const getTestCase = (schoolId: string) => handler(getHttpEvent({ pathParameters: { id: schoolId } }), getFakeContext({}))
const fakeSchoolId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  schoolService.deleteSchool = jest.fn(async () => true)
})

test('When given wrong id', async () => {
  schoolService.deleteSchool = jest.fn(async () => false)
  const x = await getTestCase(fakeSchoolId)
  expect(x).toEqual({ statusCode: 404, body: JSON.stringify({ message: `This school id does not exit` }) })
  expect(schoolService.deleteSchool).toHaveBeenCalledTimes(1)
})
