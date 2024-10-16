'use client'

import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import MyInfoInput from '../_components/MyInfoInput.tsx'

function EditInfo() {
  const { register } = useForm({
    mode: 'onBlur',
  })

  return (
    <Container>
      <InputWrapper>
        <MyInfoInput
          id="id"
          disabled
          label="기존 정보"
          register={register('id')}
          isError={false}
          errorMessage=""
        />
        <MyInfoInput
          id="passwordCheck"
          type="password"
          placeholder="기존 비밀번호를 입력해 주세요."
          register={register('password')}
          isError={false}
          errorMessage=""
        />
      </InputWrapper>
      <InputWrapper>
        <MyInfoInput
          id="password"
          label="비밀번호(PW) 변경"
          type="password"
          placeholder="변경할 비밀번호를 입력해 주세요."
          register={register('password')}
          isError={false}
          errorMessage=""
        />
        <MyInfoInput
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요."
          register={register('password')}
          isError={false}
          errorMessage=""
        />
      </InputWrapper>
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
