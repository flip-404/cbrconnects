'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import MyInfoInput from '@/app/_components/MyInfoInput'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import EditPasswordModal from '../EditPasswordModal'

function EditInfo() {
  const [passwordModal, setPasswordModal] = useState(false)
  const { register } = useForm({
    mode: 'onBlur',
  })
  const { data: session } = useSession()

  const onPasswordModal = () => {
    setPasswordModal(true)
  }

  const offPasswordModal = () => {
    setPasswordModal(false)
  }

  return (
    <Container>
      {passwordModal && <EditPasswordModal onClose={offPasswordModal} />}
      <InputWrapper>
        <MyInfoInput
          id="id"
          disabled
          label="기존 정보"
          register={register('id')}
          isError={false}
          errorMessage=""
          defaultValue={session?.user.userAuthId}
        />
      </InputWrapper>
      <ButtonWrapper>
        <EditPasswordButton onClick={onPasswordModal}>
          비밀번호 변경
        </EditPasswordButton>
      </ButtonWrapper>
      <MyInfoInput
        id="username"
        label="이름"
        register={register('password')}
        isError={false}
        errorMessage=""
        defaultValue={session?.user.userName}
        disabled
      />
      <MyInfoInput
        id="email"
        label="이메일"
        register={register('email')}
        isError={false}
        errorMessage=""
        defaultValue={session?.user.email}
        disabled
      />
      <MyInfoInput
        id="nickname"
        label="닉네임"
        register={register('nickname')}
        isError={false}
        errorMessage=""
        defaultValue={session?.user.nickname}
        disabled
      />
    </Container>
  )
}

export default EditInfo

const Container = styled.div`
  min-width: 890px;
  border: 1px solid #e0e3e8;
  border-radius: 8px;
  padding: 52px 34px;
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 768px) {
    min-width: 375px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`

const EditPasswordButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  background: #eef1f6;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: #282e38;
`
