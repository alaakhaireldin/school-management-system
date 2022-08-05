import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './patch.school.api'

const getTestCase = (body?: object) => handler(getHttpEvent({ body, pathParameters: { id: '1234312312' } }), getFakeContext({}))

test('When given empty body', async () => {
  const x = await getTestCase()
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
})

test('When schoolType is not public nor private', async () => {
  const x = await getTestCase({ schoolName: 'somename', region: 'north', schoolType: 'local' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" must be one of [private, public]` }) })
})

test('When given less than one key in body', async () => {
  const x = await getTestCase({})
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must have at least 1 key` }) })
})
