/* eslint-disable react/jsx-props-no-spreading */
import type { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type InputProps = {
  type: string
  placeholder?: string
  label?: string
  required?: boolean
  isError?: boolean
  register: UseFormRegisterReturn
}

function AuthInput({
  type,
  placeholder,
  label,
  required,
  isError,
  register,
}: InputProps) {
  return (
    <Container className="flex relative">
      <StyledLabel htmlFor={type}>{label}</StyledLabel>
      <StyledInput
        id={type}
        type={type}
        placeholder={placeholder}
        required={required}
        isError={isError}
        {...register}
      />
    </Container>
  )
}

export default AuthInput

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-size: 1.25rem;
  color: #475467;
  font-weight: 600;
  line-height: 1.875rem;
`

const StyledInput = styled.input<{ isError: boolean | undefined }>`
  display: flex;
  flex: 1;
  border: ${(props) =>
    props.isError ? '1px solid #ED6464' : '1px solid #E4E7EC'};
  border-radius: 4px;
  background-color: #f9faff;
  padding: 0.75rem 1rem;

  ::placeholder {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: #98a2b3;
    outline: none;
  }

  :focus {
    border-color: #623aff;
    background-color: white;
  }
`
