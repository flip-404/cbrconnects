import styled from 'styled-components'
import QuestionCircle from '@/assets/desktop/questionCircle.svg'

export default function Inquiry() {
  return (
    <Container>
      <QuestionCircle />
      우리가게 홍보 글 쓰고 싶어요!
    </Container>
  )
}

const Container = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 44px;
  display: flex;
  gap: 6px;
  align-items: center;
`
