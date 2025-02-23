import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import useUser from '../hooks/useUser'

function PostViewer() {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  return (
    <Container>
      <Viwer>
        <Category>FreeBoard</Category>
        <Title>안녕하세요</Title>
        <AuthorProfile></AuthorProfile>
        <Details>
          <div>2025.02.23 18:22 · 0 views</div>
          <div>
            <a>수정하기</a>
            <a>삭제하기</a>
          </div>
        </Details>
        <Content>안녕하세요</Content>
      </Viwer>
    </Container>
  )
}

export default PostViewer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Viwer = styled.div`
  width: 700px;
`
const Category = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
`
const Title = styled.div``
const AuthorProfile = styled.div``
const Details = styled.div``
const Content = styled.div``
