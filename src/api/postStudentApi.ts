import { APIGatewayEvent, Context } from 'aws-lambda'

import { schoolService } from '../lib/school/school.service'
import { studentService } from '../lib/student/student.service'
import { postStudentBodySchema } from '../lib/student/student.validation'

export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
  const body = JSON.parse(event.body!)
  const result = postStudentBodySchema.validate(body)
  if (result.error) {
    return { statusCode: 400, body: JSON.stringify({ message: `${result.error.message}` }) }
  }
  const school: { studentName: string; schoolId: string } = await JSON.parse(event.body!)
  const schoolDetails = await schoolService.getSchool(school.schoolId)
  if (!schoolDetails) return { statusCode: 404, body: JSON.stringify({ message: `${school.schoolId} does not exist` }) }

  const studentId = await studentService.createStudent(body)
  return { statusCode: 200, body: JSON.stringify({ studentId }) }
}
