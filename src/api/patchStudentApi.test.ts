import { StudentDbModel, studentService } from '../lib/student/student.service'
import { fakeStudent, fakeStudentId } from '../test/student.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './patchStudentApi'

const Payload: Pick<StudentDbModel, 'studentName' | 'schoolId' | 'gradeYear'> = {
  studentName: fakeStudent.studentName,
  schoolId: fakeStudent.schoolId,
  gradeYear: fakeStudent.gradeYear,
}

const getTestCase = (body?: Partial<StudentDbModel>) => {
  return handler(getHttpEvent({ body, pathParameters: { id: fakeStudentId } }), getFakeContext({}))
}

beforeEach(() => {
  studentService.updateStudent = jest.fn(async () => true)
})

test('When given wrong id', async () => {
  studentService.updateStudent = jest.fn(async () => false)
  const result = await getTestCase(Payload)
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `this id does not exist` }) })
  expect(studentService.updateStudent).toHaveBeenCalledTimes(1)
})

test('When given empty body', async () => {
  const result = await getTestCase()
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
  expect(studentService.updateStudent).toHaveBeenCalledTimes(0)
})

test('When given wrong grade year', async () => {
  const result = await getTestCase({
    studentName: fakeStudent.studentName,
    schoolId: fakeStudent.schoolId,
    gradeYear: 13,
  })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"gradeYear" must be less than 13` }) })
  expect(studentService.updateStudent).toHaveBeenCalledTimes(0)
})

test('When given less than one key in body', async () => {
  const result = await getTestCase({})
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must have at least 1 key` }) })
  expect(studentService.updateStudent).toHaveBeenCalledTimes(0)
})
