/* eslint-disable consistent-return */

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import supabase from '@/libs/supabaseClient'
import ProfileIcon from '@/assets/profile.svg'
import MessageIcon from '@/assets/message.svg'
import SettingsIcon from '@/assets/settings.svg'
import ChatIcon from '@/assets/chat.svg'
import { useRouter } from 'next/navigation'
import { CategoryType } from '@prisma/client'
import useCategoryStore from '@/store/useCategoryStore'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import { GET_chat } from '@/types/newIndex'
import useUser from '../../hooks/useUser'
import LoginModal from '../NewComponent/LoginModal'
import SignupModal from '../NewComponent/SignupModal'

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

function DesktopHeader() {
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
          }
          return 0
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [chats])

  return (
    <header className="p-6 flex flex-col border-b border-gray-200">
      <div className="flex justify-between">
        {/* LeftSection */}
        <div className="flex-1 relative">
          <Link href="/chat" className="text-black flex items-center text-xs">
            <ChatIcon className="mr-1 w-4 h-4" />
            {chats.map((chat: GET_chat, index: number) => {
              let className =
                'absolute tracking-wider -top-0.5 left-6 transition-all duration-500 ease-in-out opacity-0 '
              if (visibleChats === 19 && index === 0) {
                className += 'opacity-0 translate-y-5'
              } else if (visibleChats + 1 === index) {
                className += 'opacity-0 translate-y-5'
              } else if (visibleChats === index) {
                className += 'opacity-100 translate-y-0'
              } else {
                className += 'opacity-0 -translate-y-5'
              }

              return (
                <span className={className} key={chat.id + chat.created_at}>
                  {chat.author.nickname}: {chat.content}
                </span>
              )
            })}
          </Link>
        </div>

        {/* CenterSection */}
        <div className="flex-1 flex flex-col gap-1 justify-between">
          <h1 className="flex justify-center m-0">
            <Link href="/" className="cursor-pointer font-saira tracking-wide">
              K-캔버라
            </Link>
          </h1>
        </div>

        {/* RightSection */}
        <div className="flex-1 flex justify-end">
          {/* 모달 부분 리팩토링 필요 */}
          {user ? (
            <div className="flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => {
                  router.push(`/profile?userId=${user.id}`)
                }}
                aria-label="Profiles"
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                <ProfileIcon className="w-4 h-4" />
                {user.nickname}
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/message')
                }}
                aria-label="Messages"
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                <MessageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push('/settings')
                }}
                aria-label="Settings"
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  supabase.auth.signOut()
                  logout()
                }}
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen('SIGNIN')
                }}
                aria-label="Sign in"
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen('SIGNUP')
                }}
                aria-label="Sign up"
                className="flex items-center cursor-pointer text-xs font-normal hover:opacity-70"
              >
                회원가입
              </button>
            </div>
          )}
        </div>
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

      {/* Navigation */}
      <section className="flex justify-center gap-6">
        {boardLinks.map((link) => (
          <Link
            key={link.category}
            href="/board"
            onClick={() => setCategory(link.category)}
            className="cursor-pointer text-xs font-semibold"
          >
            {link.label}
          </Link>
        ))}
      </section>
    </header>
  )
}

export default DesktopHeader
