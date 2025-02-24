/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type SettingInputProps = {
  defaultValue?: string
  register?: UseFormRegisterReturn
  errorMessage?: string
  label?: string
  type?: string
  disabled?: boolean
}

function SettingInput({
  register,
  errorMessage,
  label,
  type = 'text',
  disabled,
}: SettingInputProps) {
  return (
    <Container>
      <p>{label}</p>
      <input type={type} disabled={disabled} {...register} />
      <span>{errorMessage}</span>
    </Container>
  )
}

export default SettingInput

const Container = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 700;
  }

  input {
    border: 1px solid rgba(60, 60, 67, 0.15);
    padding: 5px;
    width: 360px;
    font-size: 17px;
    font-weight: 400;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    &::placeholder {
      color: rgba(60, 60, 67, 0.3);
    }

    &:hover {
      border-color: #3399ff;
    }

    &:focus {
      border-color: #3399ff;
      box-shadow: 0 0 0 3px #b6daff;
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  }

  span {
  }
`
