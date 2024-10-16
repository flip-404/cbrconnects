/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */

import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMessage from '../ErrorMessage'

function GenderSelector({ control, errors }: { control: any; errors: any }) {
  return (
    <Container>
      <Label>
        성별 <span>*</span>
      </Label>
      <Controller
        name="gender"
        control={control}
        rules={{ required: '성별을 선택해 주세요' }}
        defaultValue=""
        render={({ field }) => (
          <SelectWrapper>
            <RadioLabel htmlFor="female">
              <RadioInput
                id="female"
                type="radio"
                value="F"
                checked={field.value === 'F'}
                onChange={(event) => {
                  field.onChange(event)
                }}
              />
              <span>여자</span>
            </RadioLabel>
            <RadioLabel htmlFor="male">
              <RadioInput
                id="male"
                type="radio"
                value="M"
                checked={field.value === 'M'}
                onChange={(event) => {
                  field.onChange(event)
                }}
              />
              <span>남자</span>
            </RadioLabel>
          </SelectWrapper>
        )}
      />
      {errors.gender && <ErrorMessage message={errors.gender.message} />}
    </Container>
  )
}

export default GenderSelector

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const RadioInput = styled.input`
  cursor: pointer;
  margin: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  outline: none;

  &:checked {
    background-color: #313131;
    border: 6px solid white;
    box-shadow: 0 0 0 1px #d9d9d9;
  }
`

const RadioLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    margin-top: 2px;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    line-height: 21.48px;
    text-align: left;
  }
`

const SelectWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 32px;
`
