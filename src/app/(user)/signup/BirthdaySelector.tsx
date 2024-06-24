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
      <StyledLabel>생년월일</StyledLabel>
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
`

const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const StyledLabel = styled.label`
  font-size: 1.25rem;
  color: #475467;
  font-weight: 600;
  line-height: 1.875rem;
`

const StyledSelect = styled.select`
  width: auto;
  height: 2rem;
  font-weight: 600;
`
