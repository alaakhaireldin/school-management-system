import { getFakeContext, getHttpEvent } from '../test/test.data'
import { handler } from './post.school.api'

const getTestCase = (body?: object) => handler(getHttpEvent({ body }), getFakeContext({}))

test('When given no body', async () => {
  const x = await getTestCase()
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" must be of type object` }) })
})

test('When schoolType is not public nor private', async () => {
  const x = await getTestCase({ schoolName: 'somename', region: 'north', schoolType: 'local' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" must be one of [private, public]` }) })
})

test('When given no "schoolName"', async () => {
  const x = await getTestCase({ region: 'north', schoolType: 'local' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolName" is required` }) })
})
test('when given no "region"', async () => {
  const x = await getTestCase({ schoolName: 'somename', schoolType: 'local' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"region" is required` }) })
})

test('When given no "schoolType"', async () => {
  const x = await getTestCase({ schoolName: 'somename', region: 'north' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"schoolType" is required` }) })
})

test('When given wrong key', async () => {
  const x = await getTestCase({ schoolName: 'somename', region: 'north', schoolType: 'private', value: '' })
  expect(x).toEqual({ statusCode: 400, body: JSON.stringify({ message: `"value" is not allowed` }) })
})
