'use client'

import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import NotificationBox from '@/app/_components/NotificationBox'
import PromotionList from '@/app/_components/PromotionList'
import MobileSubHeader from '@/app/_components/MobileSubHeader'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

import MobileWriteButton from '@/app/_components/MobileWriteButton'
import MobileHomeBoard from './MobileHomeBoard'
import EventSwiper from './EventSwiper'

export default function MobileHome() {
  const { data: postsByCategory } = useSWR(`/api/main?limit=5`, fetcher)
  console.log('postsByCategory', postsByCategory)
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
      <MobileWriteButton />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 108px;
  padding-bottom: 100px;
  position: relative;
`
