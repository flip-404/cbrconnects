import styled from 'styled-components'
import PromotionListItem from './PromotionListItem'
import TempImg1 from './1.png'
import TempImg2 from './2.png'
import Inquiry from './Inquiry'

export default function PromotionList() {
  return (
    <Container>
      <Header>
        <Title>이런 곳은 어때요?</Title>
        <MoreButton>더보기</MoreButton>
      </Header>
      <Body>
        {MockData.map((data) => (
          <PromotionListItem key={data.title} post={data} />
        ))}
      </Body>
      <Inquiry />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
`

const Title = styled.span`
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: 700;

  color: black;
`

const MoreButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;

  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-weight: 400;
  color: #949494;
`

const Body = styled.div`
  margin-top: 9px;
  display: flex;
  gap: 14px;
  justify-content: space-between;
`

const MockData = [
  {
    imgSrc: TempImg1,
    title:
      '[호주 RPL] 에이지드 케어, Individual Support 외 200개 이상의 학위를 RPL로 (EOFY Discounts)',
    createdAt: '2024-06-18',
  },
  {
    imgSrc: TempImg2,
    title:
      '헤이취티 컬리지 - RPL 학위 기술직 라이센스 /취업에 필요한 경력 인증 학위',
    createdAt: '2024-06-18',
  },
  {
    imgSrc: TempImg1,
    title: 'PT 회원모집',
    createdAt: '2024-06-18',
  },
  {
    imgSrc: TempImg2,
    title: '단기간 할인! 호주 타일 라이센스를 지금이 아니면 언제?',
    createdAt: '2024-06-18',
  },
]
