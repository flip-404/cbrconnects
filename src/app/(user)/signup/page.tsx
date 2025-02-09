'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import SignUpForm from './SignUpForm'
import Phase from './Phase'
import CompletionBox from './CompletionBox'

function SignUp() {
  const [phase, setPhase] = useState(0)
  const [userName, setUserName] = useState('')

  const handleNextPhase = () => {
    setPhase(1)
  }

  const onChangeNickname = (value: string) => {
    setUserName(value)
  }

  return (
    <Container>
      <Section>
        <Header>
          <Title>회원가입</Title>
          <Phase phase={phase} />
        </Header>
        {phase === 0 ? (
          <SignUpForm
            defaultValues={{
              authType: 'credentials',
              kakaoId: null,
              googleId: null,
            }}
            onChangeNickname={onChangeNickname}
            handleNextPhase={handleNextPhase}
          />
        ) : (
          <CompletionBox userName={userName} />
        )}
      </Section>
    </Container>
  )
}

export default SignUp

const Container = styled.div`
  margin-top: 72px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Section = styled.section`
  width: 33vw;
`

const Header = styled.section`
  margin-top: 55px;
  position: relative;
  display: flex;
  justify-content: center;
`

const Title = styled.h1`
  margin: 0px;
  font-family: Pretendard;
  font-size: 40px;
  font-weight: 800;
  line-height: 48px;
  text-align: left;
`
