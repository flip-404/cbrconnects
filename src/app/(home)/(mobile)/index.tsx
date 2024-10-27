'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { useState } from 'react'
import EventSwiper from './EventSwiper'

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
      <EventSwiper />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 56px;
`
