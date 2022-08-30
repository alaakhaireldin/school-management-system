import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuid } from 'uuid'

import { client } from '../db/db.service'
import { getUpdateDBObjectBody } from '../util/db.util'

export interface StudentDbModel {
  schoolId: string
  studentName: string
  gradeYear: number
  createdAt: number
  updatedAt: number
}
class StudentService {
  public getStudent = async (id: string) => {
    const params = {
      TableName: 'studentTable',
      Key: {
        id,
      },
    }
    const data = await client.get(params).promise()
    if (!data.Item) return
    return data.Item
  }
  private generateId = () => {
    return uuid()
  }

  public createStudent = async ({ studentName, schoolId, gradeYear }: Pick<StudentDbModel, 'studentName' | 'schoolId' | 'gradeYear'>) => {
    const date = new Date().getTime()
    const studentId = this.generateId()
    const params = {
      TableName: 'studentTable',
      Item: {
        id: studentId,
        studentName,
        schoolId,
        gradeYear,
        createdAt: date,
        updatedAt: date,
      },
    }
    await client.put(params).promise()

    return studentId
  }
  public updateStudent = async (studentId: string, details: Partial<Pick<StudentDbModel, 'gradeYear' | 'studentName' | 'schoolId'>>) => {
    const params = {
      TableName: 'studentTable',
      Key: {
        id: studentId,
      },
      ...getUpdateDBObjectBody({ ...details, updatedAt: new Date().getTime() }),
    }
    const {
      $response: { data },
    } = await client.update(params).promise()
    if (!data) return false
    return true
  }
  public deleteStudent = async (studentId: string): Promise<boolean> => {
    const params = {
      TableName: 'studentTable',
      Key: {
        id: studentId,
      },
    }
    const {
      $response: { data },
    } = await client.delete(params).promise()
    if (!data) return false
    return true
  }
}

export const studentService = new StudentService()
