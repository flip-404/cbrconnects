'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import supabase from '@/libs/supabaseClient'
import ProfileIcon from '@/assets/profile.svg'
import MessageIcon from '@/assets/message.svg'
import SettingsIcon from '@/assets/settings.svg'
import ChatIcon from '@/assets/chat.svg'
import { useRouter } from 'next/navigation'
import { CategoryType } from '@prisma/client'
import useCategoryStore from '@/store/useCategoryStore'
import useUser from '../../hooks/useUser'
import SignupModal from './SignupModal'
import LoginModal from './LoginModal'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import { GET_chat } from '@/types/newIndex'

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
  const [visibleChats, setVisibleChats] = useState(0)
  const { user, logout } = useUser()
  const { setCategory } = useCategoryStore()
  const router = useRouter()

  // 모든 useQuery 훅으로 빼기
  const chatLimit = 20
  const { data: chatData } = useQuery({
    queryKey: ['chat', 1, chatLimit],
    queryFn: ({ queryKey }) => api.get(`/chat?page=${queryKey[1]}&limit=${queryKey[2]}`),
  })

  const chats = chatData?.data.chats || []

  useEffect(() => {
    if (chats.length > 0) {
      const interval = setInterval(() => {
        setVisibleChats((prev) => {
          if (prev < chatLimit - 1) {
            return prev + 1
          } else {
            return 0
          }
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [chats])

  return (
    <Container>
      <div>
        <LeftSection>
          <Link href="/chat">
            <ChatIcon />
            {chats.map((chat: GET_chat, index: number) => {
              let className
              if (visibleChats === 19 && index === 0) className = 'exit'
              else if (visibleChats + 1 === index) className = 'exit'
              else if (visibleChats === index) className = 'enter'
              else className = 'wait'

              return (
                <span className={className}>
                  {chat.author.nickname}: {chat.content}
                </span>
              )
            })}
          </Link>
        </LeftSection>
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
  position: relative;

  & > a {
    color: black;
    display: flex;
    align-items: center;
    font-size: 12px;

    svg {
      margin-right: 5px;
      width: 17px;
      height: 17px;
    }

    & > span {
      position: absolute;
      letter-spacing: 0.1rem;
      top: -2px;
      left: 25px;
      transition:
        opacity 0.5s ease,
        transform 0.5s ease;
      opacity: 0;

      &.exit {
        opacity: 0;
        transform: translateY(20px);
      }

      &.enter {
        opacity: 1;
        transform: translateY(0);
      }

      &.wait {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  }
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
