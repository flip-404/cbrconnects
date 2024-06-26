'use client'

import { useSession } from 'next-auth/react'
import SecondPhase from '../signup/SecondPhase'
import { SignUpContainer, SignUpForm, Title } from '../signup/page'

function CompleteProfile() {
  const { data, status } = useSession()
  console.log('CompleteProfile data', data)
  // 지우면 값이 제대로 들어가지 않음
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  return (
    <SignUpContainer>
      <SignUpForm>
        <Title>회원가입</Title>
        <SecondPhase
          defaultValues={{
            userName: data?.user.userName,
            authType: data?.user.authType,
            kakaoId: data?.user.kakaoId || null,
            googleId: data?.user.googleId || null,
          }}
        />
      </SignUpForm>
    </SignUpContainer>
  )
}

export default CompleteProfile
