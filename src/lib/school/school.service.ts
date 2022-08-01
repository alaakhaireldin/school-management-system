import { v4 as uuid } from 'uuid'

import { client } from '../db/db.service'
class SchoolService {
  public getSchool = async (id: string) => {
    const params = {
      TableName: 'items',
      Key: {
        id,
      },
    }
    const data = await client.get(params).promise()
    if (!data.Item) return
    return data.Item
  }
}

export const schoolService = new SchoolService()
