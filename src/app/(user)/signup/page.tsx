'use client'

import React from 'react'
import styled from 'styled-components'

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`

const Title = styled.h1`
  margin-bottom: 20px;
`

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

function SignUp() {
  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <KakaoButton>카카오로 회원가입하기</KakaoButton>
      <GoogleButton>구글로 회원가입하기</GoogleButton>
      <Divider>------또는------</Divider>
      <IdPasswordButton>ID/PASSWORD로 가입하기</IdPasswordButton>
    </SignUpContainer>
  )
}

export default SignUp
