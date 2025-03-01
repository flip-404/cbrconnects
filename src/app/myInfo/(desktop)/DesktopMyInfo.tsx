'use client'

import styled from 'styled-components'
import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import useUser from '@/hooks/useUser'
import EditInfo from './EditInfo'
import ActivityForm from './ActivityForm'
import DefaultTab from '../DefaultTab'

function DesktopMyInfo() {
  const { user } = useUser()
  const [tab, setTab] = useState(1)

  const { data } = useSWR(
    user?.id ? `/api/myInfo?authorId=${user?.id}` : null,
    fetcher,
  )

  const { posts = [], comments = [] } = data || {}

  const onTabChange = (tabNumber: number) => {
    setTab(tabNumber)
  }

  const renderTabs = () => {
    switch (tab) {
      case 1:
        return <EditInfo />
      case 2:
        return <ActivityForm data={posts} type="POST" />
      case 3:
        return <ActivityForm data={comments} type="COMMENT" />
      default:
        return <EditInfo />
    }
  }

  if (user)
    return (
      <Container>
        <div>
          <LeftSideBar>
            <DefaultTab tab={tab} onTabChange={onTabChange} />
          </LeftSideBar>
        </div>
        <Body>{renderTabs()}</Body>
      </Container>
    )
}

export default DesktopMyInfo

const Container = styled.div`
  margin-top: 80px;
  padding-top: 36px;
  padding-bottom: 85px;
  padding-left: 88px;
  display: flex;
  gap: 57px;
`

const LeftSideBar = styled.div`
  padding: 57px 47px 122px 47px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  background-color: #fafafa;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const Body = styled.div``
