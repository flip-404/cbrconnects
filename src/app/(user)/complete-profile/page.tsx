'use client'

import { useSession } from 'next-auth/react'
import SecondPhase from '../signup/SecondPhase'
import { SignUpContainer, SignUpForm, Title } from '../signup/styledCompoents'

function CompleteProfile() {
  const { data, status } = useSession()

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
            email: data?.user.email || '',
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
