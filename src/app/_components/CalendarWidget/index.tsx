import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '@/styles/calendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

function CalendarWidget() {
  const today = new Date()
  const [date, setDate] = useState<Value>(today)

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  }

  return (
    <Container>
      <CalendarWrapper>
        <Calendar
          locale="en"
          formatDay={(_, dateObj) => moment(dateObj).format('D')} // 일 제거 숫자만 보이게
          formatYear={(locale, dateObj) => moment(dateObj).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(locale, dateObj) =>
            moment(dateObj).format('YYYY.MM')
          }
          // formatWeekday={(_, dateObj) => moment(dateObj).format('D')}
          calendarType="gregory"
          onChange={handleDateChange}
          next2Label={null}
          prev2Label={null}
          value={date}
          minDetail="year" // 10년단위 년도 숨기기
        />
      </CalendarWrapper>
    </Container>
  )
}

export default CalendarWidget

const Container = styled.div``

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    border-radius: 16px;
    padding: 21px 16px 26px 16px;
    background-color: white;
    border: 1px solid #dadada;
  }

  .react-calendar__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 8px;
  }

  .react-calendar__navigation__label {
    flex: 1;
    font-family: SUIT;
    font-size: 16px;
    font-weight: 800;
    line-height: 19.97px;
    letter-spacing: 0.48356959223747253px;
    text-align: center;
    color: #222222;
  }

  .react-calendar__navigation__arrow {
    all: unset;
    background: #eef2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 9.2px;
  }

  .react-calendar__month-view__weekdays__weekday {
    all: unset;
    font-family: Nunito;
    font-size: 11px;
    font-weight: 600;
    line-height: 15.48px;
    text-align: center;
    color: #1568c3;
    margin-bottom: 19px;
  }

  .react-calendar__month-view__days__day {
    all: unset;
    font-family: Nunito;
    font-size: 12px;
    font-weight: 500;
    line-height: 16.37px;
    text-align: center;
    color: #7c86a2;
    margin-bottom: 12px;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    all: unset;
    font-family: Nunito;
    font-size: 12px;
    font-weight: 500;
    line-height: 16.37px;
    text-align: center;
    color: #cbcbcb;
    margin-bottom: 12px;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
`
