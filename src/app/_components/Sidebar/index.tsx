import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import WriteIcon from '@/assets/desktop/write_icon.svg'
import ArrowIcon from '@/assets/desktop/home-icon-aside-notice-more.svg'
import NotificationBox from '../NotificationBox'
import CalendarWidget from '../CalendarWidget'
import EventContainer from '../EventContainer'

function Sidebar() {
  const router = useRouter()

  return (
    <SidebarSection>
      <WritePageButton
        onClick={() => {
          router.push('/write')
        }}
      >
        <LabelWrapper>
          <WriteIcon />
          게시글 작성하기
        </LabelWrapper>
        <ArrowIcon />
      </WritePageButton>
      <NotificationBox />
      <CalendarWidget />
      <EventContainer />
    </SidebarSection>
  )
}

export default Sidebar

const SidebarSection = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const WritePageButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px 10px 13px;
  background: linear-gradient(91.21deg, #ecf0fe -7.76%, #cad6ff 104.27%);
  border-radius: 14px;
  cursor: pointer;
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`
