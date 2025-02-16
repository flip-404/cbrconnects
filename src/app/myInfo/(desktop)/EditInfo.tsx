'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import MyInfoInput from '@/app/_components/MyInfoInput'
import { useState } from 'react'
import useUser from '@/app/hooks/useUser'
import EditPasswordModal from '../EditPasswordModal'

function EditInfo() {
  const [passwordModal, setPasswordModal] = useState(false)
  const { register } = useForm({
    mode: 'onBlur',
  })

  const { user } = useUser()

  const onPasswordModal = () => {
    setPasswordModal(true)
  }

  const offPasswordModal = () => {
    setPasswordModal(false)
  }

  return (
    <Container>
      {passwordModal && <EditPasswordModal onClose={offPasswordModal} />}
      <ButtonWrapper>
        <EditPasswordButton onClick={onPasswordModal}>
          비밀번호 변경
        </EditPasswordButton>
      </ButtonWrapper>
      <MyInfoInput
        id="email"
        label="이메일"
        register={register('email')}
        isError={false}
        errorMessage=""
        defaultValue={user?.email}
        disabled
      />
      <MyInfoInput
        id="nickname"
        label="닉네임"
        register={register('nickname')}
        isError={false}
        errorMessage=""
        defaultValue={user?.nickname}
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
