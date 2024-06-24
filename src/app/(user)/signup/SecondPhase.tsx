import AuthInput from '@/app/_components/AuthInput'
import { useRef } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/app/_components/ErrorMessage'
import AgreementBox from './AgreementBox'
import BirthdaySelector from './BirthdaySelector'
import GenderSelector from './GenderSelector'

export interface SignUpForm {
  userId: string
  userName: string
  email: string
  password: string
  passwordCheck: string
  nickname: string
  gender: string
  description: string
  dateOfBirth: {
    year: string
    month: string
    day: string
  }
}

function SecondPhase() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: 'onBlur',
  })
  const passwordRef = useRef<string>('')
  passwordRef.current = watch('password')

  const onValid = async (formData: SignUpForm) => {
    console.log('formData', formData)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onValid)}>
      <AuthInput
        type="userName"
        placeholder="이름을 입력해주세요."
        label="이름"
        required
        register={register('userName', {
          required: '이름을 입력해 주세요',
        })}
        isError={Boolean(errors.userName)}
      />
      {errors.userName && <ErrorMessage message={errors.userName.message!} />}
      <AuthInput
        type="email"
        placeholder="이메일을 입력해주세요."
        label="이메일"
        required
        register={register('email', {
          required: '이메일을 입력해 주세요',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '올바른 이메일 주소를 입력하세요',
          },
        })}
        isError={Boolean(errors.email)}
      />
      {errors.email && <ErrorMessage message={errors.email.message!} />}
      <AuthInput
        type="userId"
        placeholder="아이디를 입력해주세요."
        label="아이디"
        required
        register={register('userId', {
          required: '아이디를 입력해 주세요',
        })}
        isError={Boolean(errors.userId)}
      />
      {errors.userId && <ErrorMessage message={errors.userId.message!} />}
      <AuthInput
        type="password"
        placeholder="비밀번호를 입력해주세요."
        label="비밀번호"
        required
        register={register('password', {
          required: '비밀번호는 필수 입력 사항입니다',
          minLength: {
            value: 6,
            message: '비밀번호는 최소 6자 이상이어야 합니다',
          },
          maxLength: {
            value: 15,
            message: '비밀번호는 최대 15자 이하이어야 합니다',
          },
          validate: {
            hasLetter: (value) =>
              /[a-zA-Z]/.test(value) || '영문자가 하나 이상 포함되어야 합니다',
            hasNumber: (value) =>
              /\d/.test(value) || '숫자가 하나 이상 포함되어야 합니다',
          },
        })}
        isError={Boolean(errors.password)}
      />
      {errors.passwordCheck && (
        <ErrorMessage message={errors.password?.message} />
      )}
      <AuthInput
        type="passwordCheck"
        placeholder="비밀번호를 한번 더 입력해주세요."
        label="비밀번호 확인"
        required
        register={register('passwordCheck', {
          required: '비밀번호를 한번 더 입력해 주세요',
          validate: (passwordCheck) =>
            passwordCheck === passwordRef.current ||
            '비밀번호가 일치하지 않습니다',
        })}
        isError={Boolean(errors.passwordCheck)}
      />
      {errors.passwordCheck && (
        <ErrorMessage message={errors.passwordCheck.message!} />
      )}
      <AuthInput
        type="nickname"
        placeholder="사용하실 닉네임을 입력해주세요."
        label="닉네임"
        required
        register={register('nickname', {
          required: '닉네임을 입력해 주세요',
        })}
        isError={Boolean(errors.nickname)}
      />
      {errors.nickname && <ErrorMessage message={errors.nickname.message!} />}
      <GenderSelector control={control} errors={errors} />
      <BirthdaySelector control={control} errors={errors} />
      <AgreementBox />
      <SignupButton>회원가입</SignupButton>
    </StyledForm>
  )
}

export default SecondPhase

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SignupButton = styled.button`
  padding: 10px 15px;
`
