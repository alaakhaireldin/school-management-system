import { APIGatewayEvent, Context } from 'aws-lambda'

import { StudentDbModel, studentService } from '../lib/student/student.service'
import { patchStudentBodySchema } from '../lib/student/student.validation'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const studentId = event.pathParameters!.id!
  const body: Partial<Pick<StudentDbModel, 'gradeYear' | 'schoolId' | 'studentName'>> = JSON.parse(event.body!)

  const result = patchStudentBodySchema.validate(body)
  if (result.error) {
    return { statusCode: 400, body: JSON.stringify({ message: `${result.error.message}` }) }
  }

  const updated = await studentService.updateStudent(studentId, body)
  if (!updated) return { statusCode: 404, body: JSON.stringify({ message: 'this id does not exist' }) }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Update done',
    }),
  }
}
