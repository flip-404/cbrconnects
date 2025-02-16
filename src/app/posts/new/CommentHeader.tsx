import { CommentWithRelations } from '@/types'
import { formatDateToFullYear } from '@/utils/formatDate'
import styled from 'styled-components'

interface CommentHeaderProps {
  comment: CommentWithRelations
  isMyComment: boolean
  isEditMode: boolean
  selectEditComment: (id: number | null) => void
  handleDelete: () => void
}

const CommentHeader = ({
  comment,
  isMyComment,
  isEditMode,
  selectEditComment,
  handleDelete,
}: CommentHeaderProps) => (
  <HeaderWrapper>
    <HeaderLeft>
      <span>{comment.author.nickname}</span>
      {comment.author.id === comment.postId && <AuthorChip>작성자</AuthorChip>}
      {formatDateToFullYear(comment.createdAt, true)}
    </HeaderLeft>
    {isMyComment && !isEditMode && (
      <HeaderRight>
        <Button onClick={() => selectEditComment(comment.id)}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </HeaderRight>
    )}
  </HeaderWrapper>
)

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;

  span {
    display: flex;
    align-items: center;

    color: #222222;
    &::after {
      content: '|';
      margin: 0 6px;
      color: #d9d9d9;
    }
  }

  @media (max-width: 768px) {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    color: #14171c;
  }
`

const AuthorChip = styled.div`
  margin-left: 6px;
  padding: 3px 9px;
  color: #436af5;
  background: #d9e1fd;
  border-radius: 14px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
`

const HeaderRight = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
`

const Button = styled.button`
  all: unset;
  cursor: pointer;
`
export default CommentHeader
