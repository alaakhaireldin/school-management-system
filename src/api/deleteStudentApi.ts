import { APIGatewayEvent, Context } from 'aws-lambda'

import { studentService } from '../lib/student/student.service'
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const studentId = event.pathParameters!.id!
  const studentDetails = await studentService.getStudent(studentId)
  if (!studentDetails) return { statusCode: 404, body: JSON.stringify({ message: `${studentId} does not exist` }) }

  const deleteResult = await studentService.deleteStudent(studentId)
  if (!deleteResult) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'This student id does not exit',
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Student deleted',
    }),
  }
}
