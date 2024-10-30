'use client'

import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import NotificationBox from '@/app/_components/NotificationBox'
import PromotionList from '@/app/_components/PromotionList'
import MobileSubHeader from '@/app/_components/MobileSubHeader'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

import MobileHomeBoard from './MobileHomeBoard'
import EventSwiper from './EventSwiper'

export default function MobileHome() {
  const { data: postsByCategory } = useSWR(`/api/main?limit=5`, fetcher)

  const router = useRouter()

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  return (
    <Container>
      <MobileSubHeader pathname="/" />
      <EventSwiper />
      <NotificationBox />
      <MobileHomeBoard
        postsByCategory={postsByCategory}
        handleMoveToPost={handleMoveToPost}
      />
      <PromotionList />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 108px;

  position: relative;
`
