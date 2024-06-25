'use client'

import SecondPhase from '../SecondPhase'
import { SignUpContainer, SignUpForm, Title } from '../page'

function KaKaoSignUp() {
  return (
    <SignUpContainer>
      <SignUpForm>
        <Title>회원가입</Title>
        <SecondPhase defaultValues={{ userName: '김태성' }} />
      </SignUpForm>
    </SignUpContainer>
  )
}

export default KaKaoSignUp
