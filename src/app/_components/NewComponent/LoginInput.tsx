/* eslint-disable react/jsx-props-no-spreading */
import type { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type InputProps = {
  id: string
  placeholder: string
  register: UseFormRegisterReturn
  type?: string
  isError?: boolean
  errorMessage: string
}

function LoginInput({
  id,
  placeholder,
  register,
  type = 'text',
  isError,
  errorMessage,
}: InputProps) {
  return (
    <Container className="flex relative">
      <InputWrapper>
        <StyledInput
          type={type}
          id={id}
          placeholder={placeholder}
          required
          $isError={isError}
          {...register}
        />
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    </Container>
  )
}

export default LoginInput

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 26px;
  display: flex;
  justify-content: end;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #fc5555;
`

const StyledInput = styled.input<{
  $isError: boolean | undefined
}>`
  display: flex;
  flex: 1;
  background: transparent;
  border-radius: 4px;
  padding: 20px 26px;
  border: ${(props) =>
    props.$isError ? '0.87px solid #FC5555' : '0.87px solid #D8D8D8'};

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;

  ::placeholder {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    color: #878787;
  }

  :focus {
    border: 0.87px solid #3652e9;
  }
`
