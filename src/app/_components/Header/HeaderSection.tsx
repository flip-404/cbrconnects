'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'

function HeaderSection() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <Container>
      <StyledLink href="/">
        <span>캔버라</span>
        커넥트
      </StyledLink>
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
        <LoginButton
          type="button"
          onClick={() => {
            router.push('/signin')
          }}
        >
          가입 · 로그인
        </LoginButton>
      )}
    </Container>
  )
}

export default HeaderSection

const Container = styled.div`
  display: flex;
  height: 96px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const StyledLink = styled(Link)`
  font-size: 32px;
  font-weight: 700;
  color: #3b4890;
  text-decoration: none;

  span {
    color: #3b4890;
  }
`

const LoginButton = styled.button`
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
  background-color: transparent;
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
