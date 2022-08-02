export const isObjectEmpty = (objectToExamine: object): boolean => {
  return !Object.keys(objectToExamine).length
}
