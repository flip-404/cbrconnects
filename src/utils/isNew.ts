function isNew(input: Date | string): boolean {
  let date: Date
  if (typeof input === 'string') {
    date = new Date(input)
  } else if (input instanceof Date) {
    date = input
  } else {
    return false
  }

  const now = new Date()
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000
  const timeDifference = now.getTime() - date.getTime()

  return timeDifference <= twentyFourHoursInMilliseconds
}

export default isNew
