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
      <EventContainer>이벤트 영역</EventContainer>
    </Container>
  )
}

export default CalendarWidget

const Container = styled.div``

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    border-radius: 16px;
    padding: 21px 26px 40px 26px;
    background-color: white;
    border: 1px solid #dadada;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      /* color: ${(props) => props.theme.gray_1}; */
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    /* justify-content: center; */
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    /* font-weight: 800; */
    /* font-size: 1rem; */
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    /* background-color: white; */
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    /* background-color: white;
    color: ${(props) => props.theme.darkBlack}; */
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    /* flex-grow: 0 !important; */
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: ${(props) => props.theme.red_1};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.primary_2};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    /* border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0; */
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      /* color: white; */
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    /* padding: 5px 0px 18px;
    position: relative; */
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    /* flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1}; */
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    /* background-color: ${(props) => props.theme.yellow_2};
    border-radius: 0.3rem; */
  }
`
