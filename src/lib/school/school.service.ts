import { v4 as uuid } from 'uuid'

import { client } from '../db/db.service'

interface SchoolDbModel {
  schoolName: string
  region?: string
  createdAt: number
}
class SchoolService {
  public getSchool = async (id: string) => {
    const params = {
      TableName: 'schoolTable',
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

  public createSchool = async ({ schoolName }: Pick<SchoolDbModel, 'schoolName'>) => {
    const date = new Date().getTime()
    const schoolId = this.generateId()
    const params = {
      TableName: 'schoolTable',
      Item: {
        id: schoolId,
        schoolName,
        createdAt: date,
        updatedAt: date,
      },
    }
    await client.put(params).promise()
    return schoolId
  }
}

export const schoolService = new SchoolService()
