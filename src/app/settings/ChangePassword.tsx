/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import SettingInput from './SettingInput'

interface PasswordForm {
  password: string
  passwordCheck: string
}

function ChangePassword() {
  const {
    register,
    formState: { errors },
  } = useForm<PasswordForm>({
    mode: 'onBlur',
  })
  const passwordRef = useRef<string>('')

  return (
    <Container>
      <SettingInput
        label="비밀번호 변경"
        type="password"
        register={register('password', {
          required: '비밀번호는 필수 입력 사항입니다.',
          minLength: {
            value: 6,
            message: '비밀번호는 최소 6자 이상이어야 합니다.',
          },
          maxLength: {
            value: 15,
            message: '비밀번호는 최대 15자 이하이어야 합니다.',
          },
          validate: {
            hasLetter: (value) => /[a-zA-Z]/.test(value) || '영문자가 하나 이상 포함되어야 합니다.',
            hasNumber: (value) => /\d/.test(value) || '숫자가 하나 이상 포함되어야 합니다.',
          },
        })}
        errorMessage={errors.password?.message || ''}
      />
      <SettingInput
        type="password"
        register={register('passwordCheck', {
          required: '비밀번호를 한번 더 입력해 주세요.',
          validate: (passwordCheck) =>
            passwordCheck === passwordRef.current || '비밀번호가 일치하지 않습니다.',
        })}
        errorMessage={errors.passwordCheck?.message || ''}
      />
    </Container>
  )
}

export default ChangePassword

const Container = styled.div``
