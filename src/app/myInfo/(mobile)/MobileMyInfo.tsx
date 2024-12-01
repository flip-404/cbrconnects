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

  const renderHeaderLabel = () => {
    switch (tab) {
      case 0:
        return '마이페이지'
      case 1:
        return '내 정보 수정'
      case 2:
        return '작성한 게시글'
      case 3:
        return '작성한 댓글'
      default:
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
        {renderHeaderLabel()}
      </Header>
      <TabWrapper>{renderTab()}</TabWrapper>
    </Container>
  )
}

export default MobileMyInfo

const Container = styled.div`
  position: relative;
  margin-top: 56px;
  z-index: 100;
`

const Header = styled.div`
  z-index: 150;
  background-color: white;
  height: 52px;
  width: 100%;
  position: fixed;
  top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TabWrapper = styled.div`
  margin-top: 108px;
`
