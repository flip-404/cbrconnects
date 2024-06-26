'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import SecondPhase from './SecondPhase'
import { SignUpContainer, SignUpForm, Title } from './styledCompoents'

function SignUp() {
  const [phase, setPhase] = useState(0)

  const renderSignUpPhase = () => {
    switch (phase) {
      case 0:
        return (
          <SignUpForm>
            <Title>회원가입</Title>
            <KakaoButton>카카오로 회원가입하기</KakaoButton>
            <GoogleButton>구글로 회원가입하기</GoogleButton>
            <Divider>------또는------</Divider>
            <IdPasswordButton onClick={() => setPhase(1)}>
              ID/PASSWORD로 가입하기
            </IdPasswordButton>
          </SignUpForm>
        )
      case 1:
        return (
          <SignUpForm>
            <Title>회원가입</Title>
            <SecondPhase
              defaultValues={{
                authType: 'credentials',
                kakaoId: null,
                googleId: null,
              }}
            />
          </SignUpForm>
        )
      default:
        return <div />
    }
  }

  return <SignUpContainer>{renderSignUpPhase()}</SignUpContainer>
}

export default SignUp

const Button = styled.button`
  width: 200px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`

const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: #000;
`

const GoogleButton = styled(Button)`
  background-color: #db4437;
  color: #fff;
`

const IdPasswordButton = styled(Button)`
  background-color: #4285f4;
  color: #fff;
`

const Divider = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #aaa;
`
