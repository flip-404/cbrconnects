'use client'

import styled from 'styled-components'
import NotificationBox from '@/app/_components/NotificationBox'
import EventSwiper from './EventSwiper'

export default function MobileHome() {
  return (
    <Container>
      <EventSwiper />
      <NotificationBox />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 56px;
`
