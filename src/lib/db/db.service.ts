import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

let options: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = { region: 'eu-north-1' }

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  }
}

export const client = new DynamoDB.DocumentClient(options)
