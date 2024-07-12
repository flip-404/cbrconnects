'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

function SearchBar() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <Container>
      <StyledLink href="/">
        <span>캔버라</span>
        커넥트
      </StyledLink>
      <SearchContainer>
        <svg
          width="24"
          height="24"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.5"
        >
          <path
            d="M38.5977 41.0127L23.9426 26.3576C22.7759 27.3208 21.4343 28.0747 19.9176 28.6191C18.4009 29.1635 16.8319 29.4358 15.2106 29.4358C11.2225 29.4358 7.8473 28.0549 5.08494 25.2933C2.32258 22.5316 0.941406 19.1573 0.941406 15.1703C0.941406 11.1832 2.32223 7.80767 5.08389 5.04356C7.84555 2.27949 11.2199 0.897461 15.2069 0.897461C19.1939 0.897461 22.5695 2.27864 25.3336 5.041C28.0977 7.80335 29.4798 11.1786 29.4798 15.1666C29.4798 16.8328 29.2001 18.4243 28.6406 19.941C28.0812 21.4576 27.3349 22.7769 26.4015 23.8986L41.0567 38.5538L38.5977 41.0127ZM15.2106 25.9359C18.217 25.9359 20.7635 24.8926 22.85 22.8061C24.9366 20.7195 25.9798 18.173 25.9798 15.1666C25.9798 12.1602 24.9366 9.61371 22.85 7.52716C20.7635 5.44062 18.217 4.39734 15.2106 4.39734C12.2041 4.39734 9.65765 5.44062 7.57111 7.52716C5.4846 9.61371 4.44135 12.1602 4.44135 15.1666C4.44135 18.173 5.4846 20.7195 7.57111 22.8061C9.65765 24.8926 12.2041 25.9359 15.2106 25.9359Z"
            fill="#828282"
          />
        </svg>
        <SearchInput placeholder="게시글 검색" />
      </SearchContainer>

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

export default SearchBar

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

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  flex: 0.5;
`

const SearchInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
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
