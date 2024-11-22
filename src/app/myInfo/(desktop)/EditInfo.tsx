'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import MyInfoInput from '@/app/_components/MyInfoInput'
import { useState } from 'react'
import EditPasswordModal from '../EditPasswordModal'

function EditInfo() {
  const [passwordModal, setPasswordModal] = useState(false)
  const { register } = useForm({
    mode: 'onBlur',
  })

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
        />
      </InputWrapper>
      <EditPasswordButton onClick={onPasswordModal}>
        비밀번호 변경
      </EditPasswordButton>

      <MyInfoInput
        id="username"
        label="이름"
        register={register('password')}
        isError={false}
        errorMessage=""
      />
      <MyInfoInput
        id="email"
        label="이메일"
        register={register('email')}
        isError={false}
        errorMessage=""
      />
      <MyInfoInput
        id="nickname"
        label="닉네임"
        register={register('nickname')}
        isError={false}
        errorMessage=""
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
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const EditPasswordButton = styled.button``
