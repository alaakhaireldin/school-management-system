import { DynamoDB } from 'aws-sdk'

let options = {}
if (process.env.IS_OFFLINE) {
  const options = {
    region: 'eu-north-1',
    endpoint: 'http://localhost:8000',
  }
}
const db = process.env.IS_OFFLINE
const client = new DynamoDB.DocumentClient(options)

module.exports = client
