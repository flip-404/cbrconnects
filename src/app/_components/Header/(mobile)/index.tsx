'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/mobile/search.svg'

function MobileHeader() {
  return (
    <MobileHeaderContainer>
      <MobileLogo>캔버라 커넥트</MobileLogo>
      <ButtonWrapper>
        <SearchIcon />
        <MobileSigninButton>로그인</MobileSigninButton>
      </ButtonWrapper>
    </MobileHeaderContainer>
  )
}

export default MobileHeader

const MobileHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  background-color: #282e38;
  padding: 10px 20px;
`

const MobileLogo = styled.div`
  font-family: NanumSquare Neo;
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(92.69deg, #83adff -10.62%, #a174ff 111.39%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const MobileSigninButton = styled.button`
  border: 1px solid #ecf0fe;
  color: #ecf0fe;
  width: 54px;
  height: 24px;
  border-radius: 4px;
  background: #ecf0fe33;
`
