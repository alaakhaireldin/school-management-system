import { schoolService } from '../lib/school/school.service'
import { StudentDbModel, studentService } from '../lib/student/student.service'
import { getUuid } from '../lib/util/string.util'
import { fakeSchool } from '../test/school.mock.data'
import { fakeStudent, fakeStudentId } from '../test/student.mock.data'
import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './postStudentApi'

const getTestCase = (body?: object) => handler(getHttpEvent({ body }), getFakeContext({}))

beforeEach(() => {
  schoolService.getSchool = jest.fn(async () => fakeSchool)
  studentService.createStudent = jest.fn(async () => fakeStudentId)
})
const Payload: Pick<StudentDbModel, 'studentName' | 'schoolId' | 'gradeYear'> = {
  studentName: fakeStudent.studentName,
  schoolId: fakeStudent.schoolId,
  gradeYear: fakeStudent.gradeYear,
}

test('When given no body', async () => {
  const result = await getTestCase()
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
})

test('When given no "studentName"', async () => {
  const result = await getTestCase({ schoolId: fakeStudent.schoolId, gradeYear: fakeStudent.gradeYear })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"studentName" is required` }) })
})
test('when given no "schoolId"', async () => {
  const result = await getTestCase({ studentName: fakeStudent.studentName, gradeYear: fakeStudent.gradeYear })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolId" is required` }) })
})

test('When given no "gradeYear"', async () => {
  const result = await getTestCase({ studentName: fakeStudent.studentName, schoolId: fakeStudent.schoolId })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"gradeYear" is required` }) })
})

test('When given wrong key', async () => {
  const result = await getTestCase({
    studentName: fakeStudent.studentName,
    schoolId: fakeStudent.schoolId,
    gradeYear: fakeStudent.gradeYear,
    value: '',
  })
  expect(result).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" is not allowed` }) })
})

test('When given wrong schoolId', async () => {
  schoolService.getSchool = jest.fn(async () => undefined)
  const result = await getTestCase({
    studentName: fakeStudent.studentName,
    schoolId: fakeStudent.schoolId,
    gradeYear: fakeStudent.gradeYear,
  })
  expect(result).toEqual({ statusCode: 404, body: JSON.stringify({ message: `7a616345-4b75-4466-a15c-b3dcf0fe5615 does not exist` }) })
})
test('When given the right payload', async () => {
  const result = await getTestCase(Payload)
  expect(studentService.createStudent).toHaveBeenCalledTimes(1)
  expect(studentService.createStudent).toHaveBeenCalledWith(Payload)
  expect(result).toEqual({ statusCode: 200, body: JSON.stringify({ studentId: fakeStudentId }) })
})
