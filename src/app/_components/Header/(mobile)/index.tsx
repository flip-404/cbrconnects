'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/mobile/search.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchModal from './SearchModal'

function MobileHeader() {
  const [isSearchBarOn, setIsSearchBarOn] = useState(false)
  const router = useRouter()

  return !isSearchBarOn ? (
    <MobileHeaderContainer isSearchBarOn={isSearchBarOn}>
      <MobileLogo
        onClick={() => {
          router.push('/')
        }}
      >
        캔버라 커넥트
      </MobileLogo>
      <ButtonWrapper>
        <SearchButton
          onClick={() => {
            setIsSearchBarOn(true)
          }}
        >
          <SearchIcon />
        </SearchButton>
        <MobileSigninButton>로그인</MobileSigninButton>
      </ButtonWrapper>
    </MobileHeaderContainer>
  ) : (
    <SearchModal
      offSearchModal={() => {
        setIsSearchBarOn(false)
      }}
    />
  )
}

export default MobileHeader

const MobileHeaderContainer = styled.div<{ isSearchBarOn: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box; /* padding이 너비를 초과하지 않도록 */
  z-index: 1000;
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  background-color: #282e38;
  padding: ${(props) =>
    props.isSearchBarOn ? '10px 20px' : '9px 11px 9px 21px'};
`

const MobileLogo = styled.div`
  cursor: pointer;
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
  align-items: center;
  gap: 12px;
`

const SearchButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const MobileSigninButton = styled.button`
  border: 1px solid #ecf0fe;
  color: #ecf0fe;
  width: 54px;
  height: 24px;
  border-radius: 4px;
  background: #ecf0fe33;
  cursor: pointer;
`
