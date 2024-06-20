'use client'

import Link from 'next/link'
import styled from 'styled-components'

const Notifications = [
  {
    id: 1,
    postType: 'notification',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 2,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 4,
    postType: 'notification',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 5,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
  {
    id: 6,
    postType: 'event',
    title: '[알뜰요금제-중나유심] 이달의 독점 혜택 받기!',
    author: '운영자',
    createdAt: '2023.04.01',
    views: '3',
  },
]

type FixedPostListProps = {
  href: string
  label: string
}

function FixedPostList({ href = '', label }: FixedPostListProps) {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        <StyledLink href={href}>
          {label}
          <span>16</span>
        </StyledLink>
        <StyledLink href={href} color="#8d919c">
          전체보기
        </StyledLink>
      </div>
      <NotificationsTable>
        <tbody>
          {Notifications.map((notification) => (
            <tr key={notification.id}>
              <FirstCell style={{}}>
                <NotificationTypeTag postType={notification.postType}>
                  {notification.postType === 'notification' ? '공지' : '이벤트'}
                </NotificationTypeTag>
                {notification.title}
              </FirstCell>
              <SecondCell style={{}}>{notification.createdAt}</SecondCell>
            </tr>
          ))}
        </tbody>
      </NotificationsTable>
    </Container>
  )
}

export default FixedPostList

const Container = styled.div``

const StyledLink = styled(Link)<{ color?: string }>`
  display: flex;
  gap: 4px;
  color: ${(props) => props.color || 'black'};
  text-decoration: none;

  span {
    background-color: #f56565;
    padding: 1px 6px;
    border-radius: 0.5rem;
    color: white;
    font-size: 12px;
    font-weight: 700;
  }
`

const NotificationTypeTag = styled.span<{ postType: string }>`
  border: 1px solid
    ${(props) => (props.postType === 'notification' ? '#f56565' : '#38a169')};
  color: ${(props) =>
    props.postType === 'notification' ? '#f56565' : '#38a169'};
  border-radius: 0.25rem;
  padding: 2px;
  font-size: 13px;
  font-weight: 600;
`

const NotificationsTable = styled.table`
  font-size: 13px;
  font-weight: 700;
`

const FirstCell = styled.td`
  display: flex;
  gap: 2px;
  width: 300px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SecondCell = styled.td`
  width: 100px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
