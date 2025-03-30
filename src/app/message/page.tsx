'use client'

import { useState } from 'react'
import styled from 'styled-components'

export default function MessagePage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')

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
        <MessageContainer></MessageContainer>
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
  margin-top: 40px;
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

const MessageContainer = styled.ul``
