import Link from 'next/link'
import styled from 'styled-components'

function LoginRequiredNotice() {
  return (
    <Container>
      <StyledLink href="/signin">지금 가입하고 댓글에 참여해보세요!</StyledLink>
    </Container>
  )
}

export default LoginRequiredNotice

const Container = styled.div`
  display: flex;
  margin: 12px 0px 12px 0px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px 10px;
  font-size: 13px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #676767;
  cursor: pointer;
`
