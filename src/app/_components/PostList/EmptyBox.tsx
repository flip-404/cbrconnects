import styled from 'styled-components'

function EmptyBox() {
  return (
    <Container>아직 게시글이 없어요! 첫 게시글의 주인공이 되어주세요</Container>
  )
}

export default EmptyBox

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-weight: 600;
  color: #b0b0b0;
`
