'use client'

import styled from 'styled-components'
import SearchIcon from '@/assets/mobile/search.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import SearchModal from './SearchModal'

function MobileHeader() {
  const { data: session } = useSession()
  const [isSearchBarOn, setIsSearchBarOn] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log('dropdown', dropdown)
  }, [dropdown])

  return !isSearchBarOn ? (
    <MobileHeaderContainer $isSearchBarOn={isSearchBarOn}>
      <MobileLogo
        onClick={() => {
          router.push('/')
        }}
      >
        캔버라 커넥트
      </MobileLogo>
      <ButtonWrapper $isLogin={Boolean(session?.user)}>
        <SearchButton
          onClick={() => {
            setIsSearchBarOn(true)
          }}
        >
          <SearchIcon />
        </SearchButton>
        {session?.user ? (
          <ProfileWrapper onClick={() => setDropdown(true)}>
            <img src={session?.user.profileImage} />
            {dropdown && (
              <DropdownWrapper>
                <DropdownMenu
                  onClick={() => {
                    router.push('/myInfo')
                  }}
                >
                  내 정보
                </DropdownMenu>
                <DropdownMenu
                  onClick={() => {
                    signOut()
                  }}
                >
                  로그아웃
                </DropdownMenu>
              </DropdownWrapper>
            )}
          </ProfileWrapper>
        ) : (
          <MobileSigninButton>로그인</MobileSigninButton>
        )}
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

const MobileHeaderContainer = styled.div<{ $isSearchBarOn: boolean }>`
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
    props.$isSearchBarOn ? '10px 20px' : '9px 11px 9px 21px'};
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

const ButtonWrapper = styled.div<{ $isLogin: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$isLogin ? '18px' : '12px')};
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

const ProfileWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 100%;
  background-color: white;

  border: 1px solid #ccc;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;
`

const DropdownMenu = styled.div`
  z-index: 50;
  font-size: 1rem;
  font-weight: 600;

  min-width: 0;
  padding: 8px 16px;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: #e5e5e5;
  }
`
