import { studentService } from '../lib/student/student.service'
import { fakeStudent } from '../test/student.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './deleteStudentApi'

const getTestCase = (studentId: string) => handler(getHttpEvent({ pathParameters: { id: studentId } }), getFakeContext({}))
const fakeStudentId = '7a616568-4b75-4466-a15c-b3dcf0fe5615'

beforeEach(() => {
  studentService.deleteStudent = jest.fn(async () => true)
})

test('When given wrong id', async () => {
  studentService.deleteStudent = jest.fn(async () => false)
  const x = await getTestCase(fakeStudentId)
  expect(x).toEqual({ statusCode: 404, body: JSON.stringify({ message: `This student id does not exit` }) })
  expect(studentService.deleteStudent).toHaveBeenCalledTimes(1)
})
