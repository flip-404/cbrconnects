'use client'

import styled from 'styled-components'
import BackIcon from '@/assets/mobile/back.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import EditInfo from '../(desktop)/EditInfo'
import ActivityForm from '../(desktop)/ActivityForm'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import DefaultTab from '../DefaultTab'

function MobileMyInfo() {
  const { data: session } = useSession()
  const [tab, setTab] = useState(0)
  const router = useRouter()
  const { data } = useSWR(
    session?.user.id ? `/api/myInfo?authorId=${session?.user.id}` : null,
    fetcher,
  )
  const { posts = [], comments = [] } = data || {}

  const onTabChange = (tabNumber: number) => {
    setTab(tabNumber)
  }

  const onBackClick = () => {
    switch (tab) {
      case 0:
        router.back()
        break
      default:
        setTab(0)
        break
    }
  }

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <DefaultTab tab={tab} onTabChange={onTabChange} />
      case 1:
        return <EditInfo />
      case 2:
        return <ActivityForm data={posts} type="POST" />
      case 3:
        return <ActivityForm data={comments} type="COMMENT" />
      default:
        break
    }
  }

  return (
    <Container>
      <Header>
        <BackIcon onClick={onBackClick} />
        마이페이지
      </Header>
      {renderTab()}
    </Container>
  )
}

export default MobileMyInfo

const Container = styled.div`
  margin-top: 56px;
`

const Header = styled.div`
  margin-top: 56px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  border-bottom: 1px solid #e0e3e8;

  svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
  }
`
