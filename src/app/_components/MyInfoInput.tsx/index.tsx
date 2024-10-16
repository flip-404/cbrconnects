/* eslint-disable react/jsx-props-no-spreading */
import type { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'
import VisibilityOnIcon from '@/assets/visibilityOn_icon.svg'
import VisibilityOffIcon from '@/assets/visibilityOff_icon.svg'
import { useState } from 'react'

type Props = {
  id: string
  register: UseFormRegisterReturn
  placeholder?: string
  isError: boolean
  errorMessage: string
  label?: string
  type?: string
  disabled?: boolean
}

function MyInfoInput({
  id,
  register,
  placeholder,
  isError,
  errorMessage,
  label,
  type = 'text',
  disabled = false,
}: Props) {
  const [passwordOn, setPasswordOn] = useState(false)

  const togglePasswordOn = () => {
    setPasswordOn(!passwordOn)
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <StyledInput
          type={passwordOn ? 'text' : type}
          id={id}
          placeholder={placeholder}
          required
          $isError={isError}
          disabled={disabled}
          {...register}
        />
        <ExtraFeature>
          {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {type === 'password' &&
            (passwordOn ? (
              <VisibilityOnIcon onClick={togglePasswordOn} />
            ) : (
              <VisibilityOffIcon onClick={togglePasswordOn} />
            ))}
        </ExtraFeature>
      </InputWrapper>
    </Container>
  )
}

export default MyInfoInput

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.48px;
  color: #282e38;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`

const ExtraFeature = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 26px;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;

  svg {
    cursor: pointer;
  }
`

const ErrorMessage = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #fc5555;
`

const StyledInput = styled.input<{
  $isError: boolean | undefined
  disabled: boolean | undefined
}>`
  display: flex;
  flex: 1;
  background: ${(props) =>
    props.disabled ? '1px solid #C1C7D1' : 'transparent'};
  border-radius: 8px;
  padding: 10px 12px;
  border: ${(props) =>
    props.$isError ? '0.87px solid #FC5555' : '1px solid #D8D8D8'};

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;

  ::placeholder {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    color: #8390a2;
  }

  :focus {
    border: 1px solid #2947e8;
  }
`
