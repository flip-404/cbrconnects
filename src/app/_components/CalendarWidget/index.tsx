import React, { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '@/styles/calendar.css'
import moment from 'moment'
import styled from 'styled-components'

function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<CalendarProps['value']>(
    new Date(),
  )

  const onChange = (
    newDate: CalendarProps['value'],
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSelectedDate(newDate)
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
      <EventContainer>
        <p>[이벤트] </p>
        <p>[이벤트] </p>
        <p>[이벤트] </p>
      </EventContainer>
    </div>
  )
}

export default CalendarWidget

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
`
