'use client'

import styled from 'styled-components'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon from '@/assets/arrow_back.svg'
import ArrowForwardIcon from '@/assets/arrow_forward.svg'
import EmptyIcon from '@/assets/empty_profile.svg'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import api from '@/libs/axiosInstance'
import { GET_chat } from '@/types/newIndex'
import Image from 'next/image'
import { formatPostDate } from '@/utils/formatDate'

const limit = 20

function DesktopChatPage() {
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const [page, setPage] = useState(1)
  const { user } = useUser()
  const { mutate: chatPost } = useMutation({
    mutationFn: () => api.post('/chat', { userId: user?.id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat'],
      })
    },
    onSettled: () => {
      setContent('')
    },
  })

  const { data } = useQuery({
    queryKey: ['chat', page, limit],
    queryFn: ({ queryKey }) => api.get(`/chat?page=${queryKey[1]}&limit=${queryKey[2]}`),
  })

  const chats = data?.data.chats || []
  const totalCount = data?.data.totalCount || 0

  return (
    <Container>
      <h3>CHAT</h3>
      <ChatControls>
        <input
          placeholder="입력 후 엔터키"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === 'Enter' && content) {
              if (content.length > 50) {
                alert('50자 이내로 입력해주세요.')
                return
              }
              chatPost()
            }
          }}
        />
        <RefreshIcon
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['chat'],
            })
            setPage(1)
          }}
        />
        <ArrowBackIcon
          onClick={() => {
            if (page !== 1) setPage(page - 1)
            else alert('첫 페이지입니다.')
          }}
        />
        <ArrowForwardIcon
          onClick={() => {
            if (totalCount > page * limit) setPage(page + 1)
            else alert('마지막 페이지입니다.')
          }}
        />
      </ChatControls>
      <Chats>
        {chats.map((chat: GET_chat) => (
          <Chat key={chat.id}>
            <span>{formatPostDate(chat.created_at)}</span>
            <Link href={`/profile?userId=${chat.author.id}`}>
              {chat.author.profile_image ? (
                <Image
                  width={24}
                  height={24}
                  src={chat.author.profile_image}
                  alt={`${chat.author.nickname}님의 프로필 사진`}
                />
              ) : (
                <EmptyIcon />
              )}

              {chat.author.nickname}
            </Link>
            <p>{chat.content}</p>
          </Chat>
        ))}
      </Chats>
    </Container>
  )
}

export default DesktopChatPage

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    letter-spacing: 2px;
    margin: 0 0 10px 0;
    width: 1300px;
    font-size: 38px;
    font-weight: 800;
  }
`

const ChatControls = styled.div`
  width: 1300px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding-bottom: 5px;
    border: none;
    border-bottom: 0.5px solid rgba(60, 60, 67, 0.18);
    width: 650px;
    font-size: 28px;
    font-weight: 700;

    &:focus {
      outline: none;
    }
  }

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

const Chats = styled.ul`
  width: 1300px;
`

const Chat = styled.li`
  all: unset;
  display: flex;
  align-items: center;
  gap: 20px;
  letter-spacing: 1px;
  margin-bottom: 10px;

  span {
    color: #3c3c434d;
    font-size: 15px;
    font-weight: 600;
  }

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    text-decoration: none;
    color: black;
    font-size: 15px;
    font-weight: 600;

    &:hover {
      opacity: 0.5;
    }

    svg {
      border-radius: 4px;
      background-color: #f0f0f0;
      width: 24px;
      height: 24px;
    }
  }

  p {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
  }
`
