'use client'

import styled from 'styled-components'
import NotificationBox from '@/app/_components/NotificationBox'
import PromotionList from '@/app/_components/PromotionList'
import MobileSubHeader from '@/app/_components/MobileSubHeader'
import EventSwiper from './EventSwiper'
import MobileHomeBoard from './MobileHomeBoard'
import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/navigation'

export default function MobileHome() {
  const [boardTab, setBoardTab] = useState(0)
  const { data: postsByCategory, isLoading } = useSWR(
    `/api/main?limit=5`,
    fetcher,
  )

  const router = useRouter()

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  return (
    <Container>
      <MobileSubHeader pathname="/" />
      <EventSwiper />
      <NotificationBox />
      <MobileHomeBoard postsByCategory={postsByCategory} />
      <PromotionList />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 108px;

  position: relative;
`
