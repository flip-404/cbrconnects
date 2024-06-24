/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */

import ErrorMessage from '@/app/_components/ErrorMessage'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'

function GenderSelector({ control, errors }: { control: any; errors: any }) {
  return (
    <StyledFieldset>
      <StyledLabel>성별</StyledLabel>
      <SelectWrapper>
        <SelectWrapper>
          <Controller
            name="gender"
            control={control}
            rules={{ required: '성별을 선택해 주세요' }}
            defaultValue=""
            render={({ field }) => (
              <>
                <label htmlFor="female">
                  <input
                    id="female"
                    type="radio"
                    value="F"
                    checked={field.value === 'F'}
                    onChange={(event) => {
                      field.onChange(event)
                    }}
                  />
                  여자
                </label>
                <label htmlFor="male">
                  <input
                    id="male"
                    type="radio"
                    value="M"
                    checked={field.value === 'M'}
                    onChange={(event) => {
                      field.onChange(event)
                    }}
                  />
                  남자
                </label>
              </>
            )}
          />
        </SelectWrapper>
      </SelectWrapper>
      {errors.gender && <ErrorMessage message={errors.gender.message} />}
    </StyledFieldset>
  )
}

export default GenderSelector

const StyledFieldset = styled.fieldset`
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-size: 1.25rem;
  color: #475467;
  font-weight: 600;
  line-height: 1.875rem;
`

const SelectWrapper = styled.label`
  display: flex;
`
