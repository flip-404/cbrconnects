'use client'

// 완
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import NavsData from '@/mocks/NavsData'
import SearchBar from './SearchBar'
import NavButton from './NavButton'
import LoginModal from '../LoginModal'

function Header() {
  const { data: session } = useSession()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen)
  }

  return (
    <Container>
      <StyledLink href="/">캔버라 커넥트</StyledLink>
      {NavsData.map((link) => (
        <NavButton
          key={link.id}
          id={link.id}
          label={link.label}
          href={link.href}
          submenu={link.submenu}
        />
      ))}

      <SearchBar />
      {session && session.user ? (
        <ProfileWrapper
          onClick={() => {}}
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <ImageLabel htmlFor="profile-image">
            {session.user.profileImage && (
              <>
                <ProfileImage src={session.user.profileImage} alt="Profile" />
              </>
            )}
          </ImageLabel>
          {session.user.nickname}님
          {isDropdownVisible && (
            <DropdownMenu>
              <DropdownLink
                scroll={false}
                prefetch
                href="/"
                onClick={() => {
                  signOut()
                }}
              >
                로그아웃
              </DropdownLink>
              <DropdownLink scroll={false} prefetch href="/">
                1:1 문의
              </DropdownLink>
            </DropdownMenu>
          )}
        </ProfileWrapper>
      ) : (
        <LoginButton type="button" onClick={toggleLoginModal}>
          로그인
        </LoginButton>
      )}
      {loginModalOpen && <LoginModal toggleModal={toggleLoginModal} />}
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  height: 72px;
  align-items: center;
  gap: 20px;
  background-color: #2b2b2b;
`

const StyledLink = styled(Link)`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(92.69deg, #83adff -10.62%, #a174ff 111.39%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  padding-left: 88px;
  padding-right: 41px;
`

const LoginButton = styled.button`
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
