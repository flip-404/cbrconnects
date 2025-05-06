'use client'

import styled from 'styled-components'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon_ from '@/assets/arrow_back.svg'
import ArrowForwardIcon_ from '@/assets/arrow_forward.svg'
import EmptyIcon from '@/assets/empty_profile.svg'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import api from '@/libs/axiosInstance'
import { GET_chat } from '@/types/newIndex'
import Image from 'next/image'
import { userinfo } from '@prisma/client'
import { formatPostDate } from '@/utils/formatDate'

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
      <h3>채팅</h3>
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
                  <span>{formatPostDate(message.created_at)}</span>
                </div>
              ))}
            </div>
          </Chat>
        ))}
      </Chats>
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
      <ChatControls>
        <ArrowBackIcon
          $disabled={page === 1}
          onClick={() => {
            if (page !== 1) setPage(page - 1)
            else alert('첫 페이지입니다.')
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
        <ArrowForwardIcon
          $disabled={totalCount <= page * limit}
          onClick={() => {
            if (totalCount > page * limit) setPage(page + 1)
            else alert('마지막 페이지입니다.')
          }}
        />
      </ChatControls>
    </Container>
  )
}

export default MobileChatPage

const Container = styled.div`
  margin-top: 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    width: 100%;
    margin: 0 0 10px 0;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.34px;
    line-height: 28.8px;
  }

  input {
    all: unset;
    width: 100%;
    border-radius: 12px;
    padding: 10px 10px;
    font-size: 17px;
    background: #f9f9f9;
    border: 0.65px solid #bfbfbf;
    &:focus {
      background: white;
      border-color: #3399ff;
      box-shadow: 0 0 0 3px #b6daff;
    }
  }
`

const Chats = styled.ul`
  all: unset;
  overflow-y: scroll;
  height: 60vh;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  padding: 15px 0px;
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
    flex-direction: column-reverse;
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

const ChatControls = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

const ArrowBackIcon = styled(ArrowBackIcon_)<{ $disabled: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.2 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`

const ArrowForwardIcon = styled(ArrowForwardIcon_)<{ $disabled: boolean }>`
  opacity: ${({ $disabled }) => ($disabled ? 0.2 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`
