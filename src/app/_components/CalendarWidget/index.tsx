import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function CalendarWidget() {
  const [date, setDate] = useState<Date | Date[]>(new Date())

  const onChange = (newDate: Date | Date[]) => {
    setDate(newDate)
  }

  return (
    <Calendar
      locale="kr"
      formatDay={(_, date) => date.getDate()} // 일 제거 숫자만 보이게
      formatYear={(locale, date) => date.getFullYear()} // 네비게이션 눌렀을때 숫자 년도만 보이게
      formatMonthYear={(locale, date) =>
        `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
      }
      calendarType="gregory"
      onChange={onChange}
      next2Label={null}
      prev2Label={null}
      value={date}
      minDetail="year" // 10년단위 년도 숨기기
    />
  )
}

export default CalendarWidget
