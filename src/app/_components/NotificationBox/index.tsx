import styled from 'styled-components'
import Link from 'next/link'
import NoticeMoreIcon from '@/assets/noticeMore_icon.svg'

export default function NotificationBox() {
  return (
    <Container>
      <StyledLink href="/">
        공지사항 <NoticeMoreIcon />
      </StyledLink>
      <Body>
        <div>[제22대 국회의원 재외선거] 캔버라 투표소 정보</div>
        <div>[KOTRA X ANUKSS] ANU 연계 취업세미나</div>
        <div>[한인회 공지] 2024년 어버이날 행사</div>
        <div>한인 업체와 함께하는 8월 활동 이벤트!</div>
        <div>캔버라 커넥트를 오픈합니다!</div>
      </Body>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 24px;
  border-radius: 17px;
  background-color: #f7f7f7;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: Apple SD Gothic Neo;
  font-size: 15px;
  font-weight: 700;
  line-height: 19px;
  text-align: left;
  text-decoration: none;
  color: #000000;
`
const Body = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    text-align: left;
    color: #222222;
  }
`
