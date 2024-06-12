import React, { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '@/styles/calendar.css'
import moment from 'moment'

function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<CalendarProps['value']>(
    new Date(),
  )

  const onChange = (
    newDate: CalendarProps['value'],
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSelectedDate(newDate)
    console.log('Clicked element:', event.target)
  }

  return (
    <div>
      <Calendar
        locale="kr"
        formatDay={(_, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format('YYYY.MM')}
        calendarType="gregory"
        onChange={onChange}
        next2Label={null}
        prev2Label={null}
        value={selectedDate}
        minDetail="year" // 10년단위 년도 숨기기
      />
      <div className="flex flex-col">
        <p>[이벤트] </p>
        <p>[이벤트] </p>
        <p>[이벤트] </p>
      </div>
    </div>
  )
}

export default CalendarWidget
