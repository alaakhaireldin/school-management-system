import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

let options: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = { region: 'eu-north-1' }

if (true) {
  options = {
    endpoint: 'http://localhost:41581',
  }
}

export const client = new DynamoDB.DocumentClient(options)
