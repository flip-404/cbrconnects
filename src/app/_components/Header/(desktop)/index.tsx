'use client'

// 완
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import NavsData from '@/mocks/NavsData'
import useUser from '@/app/hooks/useUser'
import supabase from '@/libs/supabaseClient'
import SearchBar from './SearchBar'
import NavButton from './NavButton'
import LoginModal from '../../LoginModal'
import SignupModal from '../../SignupModal'

function DesktopHeader() {
  const { user, logout } = useUser()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState<
    null | 'SIGNIN' | 'SIGNUP'
  >(null)

  return (
    <Container>
      <StyledLink href="/">캔버라 커넥트</StyledLink>
      {NavsData.filter((link) => link.label !== '공지사항').map((link) => (
        <NavButton
          key={link.label}
          id={link.id}
          label={link.label}
          href={link.href}
          submenu={link.submenu}
        />
      ))}
      <SearchBar />
      {user ? (
        <ProfileWrapper
          onClick={() => {}}
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <ImageLabel htmlFor="profile-image">
            {user.profileImage && (
              <>
                <ProfileImage src={user.profileImage} alt="Profile" />
              </>
            )}
          </ImageLabel>
          {user.nickname}님
          {isDropdownVisible && (
            <DropdownMenu>
              <DropdownLink scroll={false} prefetch href="/myInfo">
                내 정보
              </DropdownLink>
              <DropdownLink
                scroll={false}
                prefetch
                href="/"
                onClick={() => {
                  supabase.auth.signOut()
                  logout()
                }}
              >
                로그아웃
              </DropdownLink>
            </DropdownMenu>
          )}
        </ProfileWrapper>
      ) : (
        <LoginButton
          type="button"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          로그인 · 회원가입
          {isDropdownVisible && (
            <DropdownMenu>
              <DropdownOption
                onClick={() => {
                  setLoginModalOpen('SIGNIN')
                }}
              >
                로그인
              </DropdownOption>
              <DropdownOption
                onClick={() => {
                  setLoginModalOpen('SIGNUP')
                }}
              >
                회원가입
              </DropdownOption>
            </DropdownMenu>
          )}
        </LoginButton>
      )}
      {loginModalOpen === 'SIGNIN' && (
        <LoginModal
          closeModal={() => {
            setLoginModalOpen(null)
          }}
        />
      )}
      {loginModalOpen === 'SIGNUP' && (
        <SignupModal
          closeModal={() => {
            setLoginModalOpen(null)
          }}
        />
      )}
    </Container>
  )
}

export default DesktopHeader

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  min-width: 1260px;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  height: 72px;
  align-items: center;
  gap: 20px;
  background-color: #2b2b2b;
  padding-left: 41px;
  padding-right: 41px;
`

const StyledLink = styled(Link)`
  white-space: nowrap;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(92.69deg, #83adff -10.62%, #a174ff 111.39%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`

const LoginButton = styled.button`
  position: relative;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  background-color: white;
  cursor: pointer;
  border: 1px solid #ecf0fe;
  &:hover {
    opacity: 0.9;
  }
`

const ProfileWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
`
const ImageLabel = styled.label`
  background-color: #87ceeb;
  border-radius: 50%;

  display: inline-block;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  position: relative;
`

const ProfileImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const DropdownMenu = styled.div`
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

const DropdownLink = styled(Link)`
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

const DropdownOption = styled.div`
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
