'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { useState } from 'react'
import supabase from '@/libs/supabaseClient'
import ProfileIcon from '@/assets/profile.svg'
import MessageIcon from '@/assets/message.svg'
import SettingsIcon from '@/assets/settings.svg'
import { useRouter } from 'next/navigation'
import { CategoryType } from '@prisma/client'
import useCategoryStore from '@/store/useCategoryStore'
import useUser from '../../hooks/useUser'
import SignupModal from './SignupModal'
import LoginModal from './LoginModal'

export const boardLinks: {
  label: string
  category: CategoryType
}[] = [
  { label: '공지사항', category: 'NOTICE' },
  { label: '자유게시판', category: 'FREEBOARD' },
  { label: '쿼카마켓', category: 'MARKET' },
  { label: '구인구직', category: 'JOB' },
  { label: '홍보', category: 'PROMOTION' },
]

function NewHeader() {
  const [loginModalOpen, setLoginModalOpen] = useState<null | 'SIGNIN' | 'SIGNUP'>(null)
  const { user, logout } = useUser()
  const { setCategory } = useCategoryStore()
  const router = useRouter()

  return (
    <Container>
      <div>
        <LeftSection />
        <CenterSection>
          <Logo>
            <Link href="/">캔버라커넥트</Link>
          </Logo>
        </CenterSection>
        <RightSection>
          {/* 모달 부분 리팩토링 필요 */}
          {user ? (
            <Features>
              <button
                type="button"
                onClick={() => {
                  router.push(`/profile?userId=${user.id}`)
                }}
                aria-label="Profiles"
              >
                <ProfileIcon />
                {user.nickname}
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/messages')
                }}
                aria-label="Messages"
              >
                <MessageIcon />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/settings')
                }}
                aria-label="Settings"
              >
                <SettingsIcon />
              </button>
              <button
                type="button"
                onClick={() => {
                  supabase.auth.signOut()
                  logout()
                }}
              >
                로그아웃
              </button>
            </Features>
          ) : (
            <Features>
              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen('SIGNIN')
                }}
                aria-label="Sign in"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen('SIGNUP')
                }}
                aria-label="Sign up"
              >
                회원가입
              </button>
            </Features>
          )}
        </RightSection>
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
      </div>
      <Navigation>
        {boardLinks.map((link) => (
          <Link key={link.category} href="/board" onClick={() => setCategory(link.category)}>
            {link.label}
          </Link>
        ))}
      </Navigation>
    </Container>
  )
}

export default NewHeader

const Container = styled.header`
  padding: 25px;
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #eaeaea;

  & > div {
    display: flex;
    justify-content: space-between;
  }
`

const LeftSection = styled.div`
  flex: 1;
`

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
  a {
    all: unset;
    cursor: pointer;
    font-family: var(--font-saira);
    letter-spacing: 0.3rem;
  }
`

const Navigation = styled.section`
  display: flex;
  justify-content: center;
  gap: 25px;

  a {
    all: unset;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
  }
`

const Features = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;

  svg {
    width: 17px;
    height: 17px;
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;

    &:hover {
      opacity: 0.7;
    }
  }
`
