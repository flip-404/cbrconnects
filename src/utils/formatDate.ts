function formatDateToMonth(input: Date | string): string {
  let date: Date

  if (typeof input === 'string') {
    date = new Date(input)

    if (Number.isNaN(date.getTime())) {
      return '유효하지 않은 날짜'
    }
  } else if (input instanceof Date) {
    date = input
  } else {
    return '유효하지 않은 날짜'
  }

  const now = new Date()

  const timeDifference = now.getTime() - date.getTime()
  const oneMinute = 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = 7 * oneDay

  if (timeDifference < oneMinute) {
    return '방금 전'
  }
  if (timeDifference < oneHour) {
    const minutes = Math.floor(timeDifference / (60 * 1000))
    return `${minutes}분전`
  }
  if (timeDifference < oneDay) {
    const hours = Math.floor(timeDifference / oneHour)
    return `${hours}시간전`
  }
  if (timeDifference < oneWeek) {
    const days = Math.floor(timeDifference / oneDay)
    return `${days}일전`
  }

  const currentYear = now.getFullYear()
  const inputYear = date.getFullYear()

  if (inputYear === currentYear) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

function formatDateToFullYear(
  input: Date | string,
  includeTime: boolean = false,
) {
  let date

  if (typeof input === 'string') {
    date = new Date(input)
  } else if (input instanceof Date) {
    date = input
  } else {
    throw new Error('Invalid input: input must be a string or Date object')
  }

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date: unable to parse the input date')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${formattedDate} ${hours}:${minutes}`
  }

  return formattedDate
}

export { formatDateToMonth, formatDateToFullYear }
