'use client'

import AuthInput from '@/app/_components/AuthInput'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/app/_components/ErrorMessage'
import type { SignUpForm } from '@/app/api/(user)/signup/route'
import NotificationModal from '@/app/_components/NotificationModal'
import { useRouter } from 'next/navigation'
import AgreementBox from './AgreementBox'
import BirthdaySelector from './BirthdaySelector'
import GenderSelector from './GenderSelector'

function SecondPhase({
  defaultValues,
}: {
  defaultValues?: Partial<SignUpForm>
}) {
  const [modalStatus, setModalStatus] = useState<null | string>(null)
  const [profileImage, setProfileImage] = useState<null | string>(null)
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
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

  const handdleModalClose = () => {
    router.back()
  }

  const checkExists = async (value: string, type: string) => {
    const response = await fetch(`/api/exists?${type}=${value}`)
    const { exists } = await response.json()

    return !exists
  }

  const onValid = async (formData: SignUpForm) => {
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
      setModalStatus('success')
    } else {
      setModalStatus('fail')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onValid)}>
      <ProfileImageWrapper>
        <StyledLabel>프로필 사진 (선택)</StyledLabel>
        <ImageInput
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <ImageLabel htmlFor="profile-image">
          {profileImage ? (
            <ProfileImage src={profileImage} alt="Profile" />
          ) : (
            <Placeholder>+</Placeholder>
          )}
        </ImageLabel>
      </ProfileImageWrapper>
      <AuthInput
        disabled={!!defaultValues?.userName}
        id="userName"
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
        disabled={!!defaultValues?.email}
        id="email"
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
          validate: async (value) => {
            return (
              (await checkExists(value, 'email')) ||
              '이미 존재하는 이메일입니다'
            )
          },
        })}
        isError={Boolean(errors.email)}
      />
      {errors.email && <ErrorMessage message={errors.email.message!} />}
      <AuthInput
        id="userAuthId"
        placeholder="아이디를 입력해주세요."
        label="아이디"
        required
        register={register('userAuthId', {
          required: '아이디를 입력해 주세요',
          validate: async (value) => {
            return (
              (await checkExists(value, 'userAuthId')) ||
              '이미 존재하는 아이디입니다'
            )
          },
        })}
        isError={Boolean(errors.userAuthId)}
      />
      {errors.userAuthId && (
        <ErrorMessage message={errors.userAuthId.message!} />
      )}
      <AuthInput
        id="password"
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
        id="passwordCheck"
        type="password"
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
        id="nickname"
        placeholder="사용하실 닉네임을 입력해주세요."
        label="닉네임"
        required
        register={register('nickname', {
          required: '닉네임을 입력해 주세요',
          validate: async (value) => {
            return (
              (await checkExists(value, 'nickname')) ||
              '이미 존재하는 닉네임입니다'
            )
          },
        })}
        isError={Boolean(errors.nickname)}
      />
      {errors.nickname && <ErrorMessage message={errors.nickname.message!} />}
      <GenderSelector control={control} errors={errors} />
      <BirthdaySelector control={control} errors={errors} />
      <AgreementBox />
      <SignupButton type="submit">회원가입</SignupButton>{' '}
      {modalStatus === 'success' && (
        <NotificationModal
          onClose={handdleModalClose}
          label="회원가입이 완료 되었습니다."
        />
      )}
      {modalStatus === 'fail' && (
        <NotificationModal
          onClose={handdleModalClose}
          label="회원가입에 실패 하였습니다.."
        />
      )}
      {modalStatus === 'loading' && (
        <NotificationModal
          onClose={handdleModalClose}
          label="회원가입 중 입니다. 잠시만 기다려주세요"
        />
      )}
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

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageInput = styled.input`
  display: none;
`

const ImageLabel = styled.label`
  background-color: #87ceeb;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;

  &:hover {
    opacity: 0.8;
  }
`

const StyledLabel = styled.label`
  width: 100%;
  font-size: 1.25rem;
  color: #475467;
  font-weight: 600;
  line-height: 1.875rem;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`
