/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */

import ErrorMessage from '@/app/_components/ErrorMessage'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'

function BirthdaySelector({ control, errors }: { control: any; errors: any }) {
  const yearOptions = () => {
    const options = []
    for (let year = new Date().getFullYear(); year >= 1910; year--) {
      options.push(
        <option key={year} value={year}>
          {year}년
        </option>,
      )
    }
    return options
  }

  const monthOptions = () => {
    const options = []
    for (let month = 1; month <= 12; month++) {
      options.push(
        <option key={month} value={month}>
          {month}월
        </option>,
      )
    }
    return options
  }

  const dayOptions = () => {
    const options = []
    for (let day = 1; day <= 31; day++) {
      options.push(
        <option key={day} value={day}>
          {day}일
        </option>,
      )
    }
    return options
  }

  return (
    <Container>
      <Label>
        생년월일 <span>*</span>
      </Label>
      <SelectWrapper>
        <Controller
          name="dateOfBirth.year"
          control={control}
          rules={{ required: '연도를 선택해 주세요' }}
          render={({ field }) => (
            <StyledSelect {...field}>
              <option value="">연도 선택</option>
              {yearOptions()}
            </StyledSelect>
          )}
        />

        <Controller
          name="dateOfBirth.month"
          rules={{ required: '월을 선택해 주세요' }}
          control={control}
          render={({ field }) => (
            <StyledSelect {...field}>
              <option value="">월 선택</option>
              {monthOptions()}
            </StyledSelect>
          )}
        />
        <Controller
          name="dateOfBirth.day"
          rules={{ required: '일을 선택해 주세요' }}
          control={control}
          render={({ field }) => (
            <StyledSelect {...field}>
              <option value="">일 선택</option>
              {dayOptions()}
            </StyledSelect>
          )}
        />
      </SelectWrapper>
      {errors.dateOfBirth?.year && (
        <ErrorMessage message={errors.dateOfBirth.year.message} />
      )}
      {errors.dateOfBirth?.month && (
        <ErrorMessage message={errors.dateOfBirth.month.message} />
      )}
      {errors.dateOfBirth?.day && (
        <ErrorMessage message={errors.dateOfBirth.day.message} />
      )}
    </Container>
  )
}

export default BirthdaySelector

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SelectWrapper = styled.div`
  display: flex;
  gap: 14px;
`

const Label = styled.label`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.48px;
  color: black;

  span {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.48px;
    color: #1e42ff;
  }
`

const StyledSelect = styled.select`
  width: auto;
  padding: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
`
