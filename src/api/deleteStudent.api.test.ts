import { studentService } from '../lib/student/student.service'
import { fakeStudent } from '../test/student.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './deleteStudentApi'

const getTestCase = (studentId: string) => handler(getHttpEvent({ pathParameters: { id: studentId } }), getFakeContext({}))
const fakeStudentId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  studentService.getStudent = jest.fn(async () => undefined)
  studentService.deleteStudent = jest.fn(async () => true)
})

test('When given wrong id', async () => {
  const result = await getTestCase(fakeStudentId)
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `${fakeStudentId} does not exist` }) })
  expect(studentService.deleteStudent).toHaveBeenCalledTimes(0)
})
