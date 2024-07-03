import { CommentWithRelations } from '@/types'
import formatDate from '@/utils/formatData'
import styled from 'styled-components'

function CommentBox({ content }: { content: CommentWithRelations }) {
  return (
    <Container>
      <AuthorProfile />
      <CommentWrapper>
        <CommentAuthor>{content.author.nickname}</CommentAuthor>
        <CommentContent>{content.content}</CommentContent>
        <CommentDetail>{formatDate(content.createdAt)} 좋아요 0</CommentDetail>
      </CommentWrapper>
    </Container>
  )
}

export default CommentBox

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 14px 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`

const AuthorProfile = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e1e1e1;

  border-radius: 990px;
`

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const CommentContent = styled.div`
  font-size: 15px;
  font-weight: 500;
`
const CommentAuthor = styled.div`
  font-size: 13px;
  font-weight: 700;
`

const CommentDetail = styled.div`
  font-size: 13px;
  font-weight: 400;
`
