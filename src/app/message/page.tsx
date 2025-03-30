'use client'

import useUser from '@/hooks/useUser'
import api from '@/libs/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'

export default function MessagePage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')
  const { user } = useUser()

  const { data: messages } = useQuery({
    queryKey: ['messages', user?.id, activeTab],
    enabled: !!user?.id,
    queryFn: ({ queryKey }) => api.get(`/messages?userId=${user?.id}&type=${activeTab}`),
  })

  console.log('messages', messages)

  return (
    <>
      <Container>
        <Tabs>
          <Tab $active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
            받은 쪽지함
          </Tab>
          <Tab $active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
            보낸 쪽지함
          </Tab>
        </Tabs>
        <MessageContainer>
          {messages?.data.map((message: any) => (
            <li key={message.id}>
              <div>
                <strong>
                  {activeTab === 'received' ? message.sender.nickname : message.receiver.nickname}{' '}
                  <span>{message.created_at.toString()}</span>
                </strong>
                <p>{message.content}</p>
              </div>
            </li>
          ))}
        </MessageContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    margin-top: 50px;
  }
`

const Tabs = styled.ul`
  all: unset;
  margin: 40px 0 40px 0;
  width: 1300px;
  display: flex;
  gap: 25px;
  color: #3c3c434d;

  @media (max-width: 1200px) {
    margin: 25px 0 0 0;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
  }
`

const Tab = styled.li<{ $active: boolean }>`
  list-style: none;
  margin: 0;
  font-size: 38px;
  font-weight: 800;
  color: ${(props) => (props.$active ? '#000' : '#3c3c434d')};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3c3c4399;
  }

  @media (max-width: 1200px) {
    font-size: 24px;
    font-weight: 800;
  }
`

const MessageContainer = styled.ul`
  margin: 0;
  padding: 0;
  width: 700px;

  li {
    list-style: none;
    background-color: #74748014;
    margin: 0 0 5px 0;
    padding: 30px;
    font-size: 20px;
    font-weight: 500;
    color: #3c3c434d;
    border-bottom: 1px solid #3c3c434d;

    strong {
      color: #000;
      font-weight: 600;
      margin-right: 15px;

      span {
        font-size: 11px;
        color: #3c3c434d;
      }
    }

    p {
      margin: 0;
      color: black;
      font-weight: 400;
      margin-right: 15px;
    }
  }
`
