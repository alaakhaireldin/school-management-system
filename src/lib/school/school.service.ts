import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuid } from 'uuid'

import { client } from '../db/db.service'
import { getUpdateDBObjectBody } from '../util/db.util'

export enum SCHOOL_TYPE {
  PRIVATE = 'private',
  PUBLIC = 'public',
}
export interface SchoolDbModel {
  schoolName: string
  region?: string
  createdAt: number
  // updatedAt: number
  schoolType: SCHOOL_TYPE
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

  public createSchool = async ({ schoolName, schoolType }: Pick<SchoolDbModel, 'schoolName' | 'schoolType'>) => {
    const date = new Date().getTime()
    const schoolId = this.generateId()
    const params = {
      TableName: 'schoolTable',
      Item: {
        id: schoolId,
        schoolName,
        schoolType,
        createdAt: date,
        updatedAt: date,
      },
    }
    await client.put(params).promise()

    return schoolId
  }
  public updateSchool = async (schoolId: string, details: Partial<Pick<SchoolDbModel, 'schoolType' | 'region' | 'schoolName'>>) => {
    const params = {
      TableName: 'schoolTable',
      Key: {
        id: schoolId,
      },
      ...getUpdateDBObjectBody({ ...details, updatedAt: new Date().getTime() }),
    }
    const {
      $response: { data },
    } = await client.update(params).promise()
    if (!data) return false
    return true
  }
  public deleteSchool = async (schoolId: string): Promise<boolean> => {
    const params = {
      TableName: 'schoolTable',
      Key: {
        id: schoolId,
      },
    }
    const {
      $response: { data },
    } = await client.delete(params).promise()
    if (!data) return false
    return true
  }
}

export const schoolService = new SchoolService()
