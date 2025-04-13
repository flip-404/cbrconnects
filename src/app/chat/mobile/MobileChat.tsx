'use client'

import styled from 'styled-components'
import EmptyIcon from '@/assets/empty_profile.svg'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import api from '@/libs/axiosInstance'
import { GET_chat } from '@/types/newIndex'
import Image from 'next/image'
import { userinfo } from '@prisma/client'

const limit = 20

type GroupedChat = {
  id: number
  author: userinfo
  messages: {
    id: number
    content: string
    created_at: string
  }[]
}

function MobileChatPage() {
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

  const groupedChats = chats.reduce((acc: GroupedChat[], chat: GET_chat, index: number) => {
    const prevChat = index > 0 ? chats[index - 1] : null

    if (!prevChat || prevChat.author.id !== chat.author.id) {
      acc.push({
        id: chat.id,
        author: chat.author,
        messages: [{ id: chat.id, content: chat.content, created_at: chat.created_at }],
      })
    } else {
      acc[acc.length - 1].messages.push({
        id: chat.id,
        content: chat.content,
        created_at: chat.created_at,
      })
    }

    return acc
  }, []) as GroupedChat[]

  return (
    <Container>
      <Chats>
        {groupedChats.map((chatGroup) => (
          <Chat key={chatGroup.id}>
            <Link className="profile" href={`/profile?userId=${chatGroup.author.id}`}>
              {chatGroup.author.profile_image ? (
                <Image
                  width={24}
                  height={24}
                  src={chatGroup.author.profile_image}
                  alt={`${chatGroup.author.nickname}님의 프로필 사진`}
                />
              ) : (
                <EmptyIcon />
              )}
              {chatGroup.author.nickname}
            </Link>
            <div className="content-container">
              {chatGroup.messages.map((message) => (
                <div key={message.id} className="message">
                  <p>{message.content}</p>
                  <span>{message.created_at.toString()}</span>
                </div>
              ))}
            </div>
          </Chat>
        ))}
      </Chats>
    </Container>
  )
}

export default MobileChatPage

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

const Chats = styled.ul`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Chat = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;

  .profile {
    all: unset;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    letter-spacing: -0.34px;
    line-height: 19.5px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .message {
      display: flex;
      align-items: center;
    }

    & > div > p {
      display: inline-block;
      border-radius: 12px;
      margin: 0;
      background-color: #f2f2f7;
      padding: 7px 10px;
      font-size: 15px;
      letter-spacing: -0.34px;
      line-height: 22.5px;
    }

    & > div > span {
      margin-left: 5px;
      font-size: 9px;
      font-weight: 600;
      color: #3c3c432e;
    }
  }

  svg {
    border-radius: 4px;
    background-color: #f0f0f0;
    width: 24px;
    height: 24px;
  }
`
