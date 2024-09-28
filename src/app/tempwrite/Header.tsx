import styled from 'styled-components'
import WriteIcon from '@/assets/write_icon.svg'

type Props = { onClickWrite: () => void }

function Header({ onClickWrite }: Props) {
  return (
    <Container>
      <Title>
        <WriteIcon /> 게시글 작성하기
      </Title>
      <ButtonWrapper>
        <CancleButton>취소</CancleButton>
        <WriteButton onClick={onClickWrite}>등록</WriteButton>
      </ButtonWrapper>
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 80vw;
  font-family: NanumSquare Neo;
  font-size: 24px;
  font-weight: 700;
  color: #222222;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;

  button {
    padding: 10px 15px;
    border-radius: 7px;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
  }
`

const CancleButton = styled.button`
  cursor: pointer;
  border: 1px solid #d8d8d8;
  color: black;
  background-color: white;
`

const WriteButton = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
`
