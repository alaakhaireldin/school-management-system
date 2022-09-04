export const getUpdateDBObjectBody = (params: object) => {
  const arrayedParams = Object.entries(params)
  const result = arrayedParams.reduce(
    (prev, curr) => {
      return {
        ExpressionAttributeValues: { ...prev.ExpressionAttributeValues, [`:${curr[0]}`]: curr[1] },
      }
    },
    {
      ExpressionAttributeValues: {},
    },
  )
  const updateExpression = Object.keys(params)
    .map(element => {
      return `${element} = :${element}`
    })
    .join(', ')
  const finalResult = `SET ${updateExpression}`

  return {
    ...result,
    UpdateExpression: finalResult,
  }
}
