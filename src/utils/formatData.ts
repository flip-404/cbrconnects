function formatDate(input: Date | string): string {
  let date: Date

  if (typeof input === 'string') {
    // Try to parse the string as a Date
    date = new Date(input)

    // If the parsed date is invalid, handle it (e.g., return an error message)
    if (Number.isNaN(date.getTime())) {
      return '유효하지 않은 날짜'
    }
  } else if (input instanceof Date) {
    date = input
  } else {
    return '유효하지 않은 날짜' // Handle unexpected input types
  }

  const now = new Date()

  // 시간 차이 계산 (밀리세컨드 단위)
  const timeDifference = now.getTime() - date.getTime()
  const oneMinute = 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = 7 * oneDay

  if (timeDifference < oneMinute) {
    // 1분 이내
    return '방금 전'
  }
  if (timeDifference < oneHour) {
    // 1시간 이내
    const minutes = Math.floor(timeDifference / (60 * 1000))
    return `${minutes}분전`
  }
  if (timeDifference < oneDay) {
    // 24시간 이내
    const hours = Math.floor(timeDifference / oneHour)
    return `${hours}시간전`
  }
  if (timeDifference < oneWeek) {
    // 일주일 이내
    const days = Math.floor(timeDifference / oneDay)
    return `${days}일전`
  }

  // 현재 년도
  const currentYear = now.getFullYear()
  const inputYear = date.getFullYear()

  if (inputYear === currentYear) {
    // 올해 작성된 경우
    const month = date.getMonth() + 1 // 월은 0부터 시작하므로 +1
    const day = date.getDate()
    return `${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
  }
  // 올해가 아닌 경우
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 +1
  const day = date.getDate()
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

export default formatDate
