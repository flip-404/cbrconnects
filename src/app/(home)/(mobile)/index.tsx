'use client'

import styled from 'styled-components'
import NotificationBox from '@/app/_components/NotificationBox'
import PromotionList from '@/app/_components/PromotionList'
import EventSwiper from './EventSwiper'
import MobileSubHeader from '@/app/_components/MobileSubHeader'

export default function MobileHome() {
  return (
    <Container>
      <MobileSubHeader pathname={'/'} />
      <EventSwiper />
      <NotificationBox />
      <PromotionList />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 108px;

  position: relative;
`
