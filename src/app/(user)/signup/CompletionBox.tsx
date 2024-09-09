'use client'

import LoginModal from '@/app/_components/LoginModal'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

function CompletionBox({ userName }: { userName: string }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen)
  }

  return (
    <Container>
      <Header>가입이 완료되었습니다.</Header>
      <Body>
        <Logo src="/CanberraLogo.png" alt="캔버라커넥트" />
        <WelcomeGreting>
          안녕하세요! {userName} 님. <br />
          캔버라 커넥트 회원이 되신 것을 환영합니다.
        </WelcomeGreting>
        <Guide>
          회원가입 내역 확인 및 수정은
          <span> 마이페이지 {'>'} 정보 수정</span>
          에서 가능합니다.
        </Guide>
      </Body>
      <Footer>
        <HomeButton href="/">메인화면</HomeButton>
        <LoginButton onClick={toggleLoginModal}>로그인</LoginButton>
      </Footer>
      {loginModalOpen && <LoginModal toggleModal={toggleLoginModal} />}
    </Container>
  )
}

export default CompletionBox

const Container = styled.div`
  background-color: white;
  padding-bottom: 84px;
`
const Header = styled.div`
  margin-top: 56px;
  display: flex;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  color: black;
  padding-bottom: 8px;
  border-bottom: 1px solid #e7e7e7;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  object-fit: cover;
  width: 270px;
`

const WelcomeGreting = styled.h2`
  margin: 0px;
  font-family: Pretendard;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
`

const Guide = styled.p`
  margin-top: 46px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  text-align: center;

  span {
    color: #1b3be6;
  }
`

const Footer = styled.div`
  margin-top: 110px;
  padding-top: 16px;
  border-top: 1px solid #e7e7e7;
  display: flex;
  justify-content: space-between;
`

const HomeButton = styled(Link)`
  padding: 9.5px 91px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #e1e1e1;
  border-radius: 7px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

const LoginButton = styled.button`
  cursor: pointer;
  padding: 9.5px 91px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #e1e1e1;
  border-radius: 7px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #363636;
  color: white;
`
