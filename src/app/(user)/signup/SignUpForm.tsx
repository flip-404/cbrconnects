'use client'

import SignupInput from '@/app/_components/SignupInput'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import type { SignUpBody } from '@/app/api/(user)/signup/route'
import NotificationModal from '@/app/_components/NotificationModal'
import { useRouter } from 'next/navigation'
import AgreementBox from './AgreementBox'
import BirthdaySelector from './BirthdaySelector'
import GenderSelector from './GenderSelector'
import ImageSelector from './ImageSelector'

function SignUpForm({
  defaultValues,
  onChangeUserName,
  handleNextPhase,
}: {
  defaultValues?: Partial<SignUpBody>
  onChangeUserName: (value: string) => void
  handleNextPhase: () => void
}) {
  const [modalStatus, setModalStatus] = useState<null | string>(null)
  const [profileImage, setProfileImage] = useState<null | string>(null)
  const [allAgreementChecked, setAllAgreementChecked] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpBody>({
    mode: 'onBlur',
    defaultValues: defaultValues || {},
  })
  const passwordRef = useRef<string>('')
  passwordRef.current = watch('password')

  const router = useRouter()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    const { imageURL } = await fetch(`/api/image`, {
      method: 'POST',
      body: formData,
    }).then((res) => {
      return res.json()
    })

    setProfileImage(imageURL)
  }

  const handleModalClose = () => {
    router.back()
  }

  const checkExists = async (value: string, type: string) => {
    const response = await fetch(`/api/exists?${type}=${value}`)
    const { exists } = await response.json()

    return !exists
  }

  const onValid = async (formData: SignUpBody) => {
    if (!allAgreementChecked) return
    setModalStatus('loading')
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        authType: defaultValues?.authType,
        kakaoId: defaultValues?.kakaoId,
        googleId: defaultValues?.googleId,
        profileImage,
      }),
    })

    if (res.status === 200) {
      handleNextPhase()
    } else {
      setModalStatus('fail')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onValid)}>
      <Label>회원 정보를 입력해 주세요.</Label>
      <ImageSelector
        handleImageChange={handleImageChange}
        profileImage={profileImage}
      />
      <SignupInput
        id="userAuthId"
        placeholder="아이디를 입력해 주세요."
        label="아이디(ID)"
        register={register('userAuthId', {
          required: '아이디를 입력해 주세요.',
          validate: async (value) => {
            return (
              (await checkExists(value, 'userAuthId')) ||
              '이미 존재하는 아이디입니다.'
            )
          },
        })}
        isError={Boolean(errors.userAuthId)}
        errorMessage={errors.userAuthId?.message || ''}
      />
      <PWInputWrapper>
        <SignupInput
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호(PW)"
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
              hasLetter: (value) =>
                /[a-zA-Z]/.test(value) ||
                '영문자가 하나 이상 포함되어야 합니다.',
              hasNumber: (value) =>
                /\d/.test(value) || '숫자가 하나 이상 포함되어야 합니다.',
            },
          })}
          isError={Boolean(errors.password)}
          errorMessage={errors.password?.message || ''}
        />
        <SignupInput
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요."
          register={register('passwordCheck', {
            required: '비밀번호를 한번 더 입력해 주세요.',
            validate: (passwordCheck) =>
              passwordCheck === passwordRef.current ||
              '비밀번호가 일치하지 않습니다.',
          })}
          isError={Boolean(errors.passwordCheck)}
          errorMessage={errors.passwordCheck?.message || ''}
        />
      </PWInputWrapper>
      <SignupInput
        disabled={!!defaultValues?.userName}
        id="userName"
        placeholder="이름을 입력해 주세요."
        label="이름"
        register={register('userName', {
          required: '이름을 입력해 주세요.',
          onChange: (e) => onChangeUserName(e.target.value),
        })}
        isError={Boolean(errors.userName)}
        errorMessage={errors.userName?.message || ''}
      />
      <SignupInput
        disabled={!!defaultValues?.email}
        id="email"
        placeholder="이메일을 입력해 주세요."
        label="이메일"
        register={register('email', {
          required: '이메일을 입력해 주세요.',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '올바른 이메일 주소를 입력하세요.',
          },
          validate: async (value) => {
            return (
              (await checkExists(value, 'email')) ||
              '이미 존재하는 이메일입니다.'
            )
          },
        })}
        isError={Boolean(errors.email)}
        errorMessage={errors.email?.message || ''}
      />
      <SignupInput
        id="nickname"
        placeholder="사용하실 닉네임을 입력해 주세요."
        label="닉네임"
        register={register('nickname', {
          required: '닉네임을 입력해 주세요.',
          validate: async (value) => {
            return (
              (await checkExists(value, 'nickname')) ||
              '이미 존재하는 닉네임입니다.'
            )
          },
        })}
        isError={Boolean(errors.nickname)}
        errorMessage={errors.nickname?.message || ''}
      />
      <GenderSelector control={control} errors={errors} />
      <BirthdaySelector control={control} errors={errors} />
      <AgreementBox setAllAgreementChecked={setAllAgreementChecked} />
      <SignupButton type="submit">회원가입</SignupButton>{' '}
      {modalStatus === 'fail' && (
        <NotificationModal
          onClose={handleModalClose}
          onCloseLabel="닫기"
          label="회원가입에 실패 하였습니다."
        />
      )}
      {modalStatus === 'loading' && (
        <NotificationModal label="회원가입 중 입니다. 잠시만 기다려주세요" />
      )}
    </StyledForm>
  )
}

export default SignUpForm

const Label = styled.label`
  margin-top: 56px;
  display: flex;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  color: black;
  padding-bottom: 8px;
  border-bottom: 1px solid #e7e7e7;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 76px;
`

const SignupButton = styled.button`
  margin-top: 36px;
  cursor: pointer;
  color: white;
  background-color: #363636;
  padding: 10px 58px;
  border-radius: 7px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
`

const PWInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`