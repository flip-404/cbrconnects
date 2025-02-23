import styled from 'styled-components'
import LikeIcon from '@/assets/desktop/like_icon.svg'
import { CommentWithRelations } from '@/types'

interface ViewModeProps {
  comment: CommentWithRelations
  editText: string
  selectReplyComment: (id: number) => void
}

const ViewMode = ({ comment, editText, selectReplyComment }: ViewModeProps) => (
  <>
    <CommentBody>{editText}</CommentBody>
    <CommentFooter>
      {!comment.parent_id && (
        <Reply onClick={() => selectReplyComment(comment.id)}>
          답글 남기기
        </Reply>
      )}
    </CommentFooter>
  </>
)

const CommentBody = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`

const CommentFooter = styled.div`
  margin-top: 5px;
  display: flex;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  gap: 10px;
`

const LikeWrapper = styled.div<{ $isLiked: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  path {
    stroke: ${(props) => props.$isLiked && 'red'};
    fill: ${(props) => props.$isLiked && 'red'};
  }
  &:hover {
    path {
      stroke: red;
      fill: red;
    }
  }
`

const Reply = styled.div`
  cursor: pointer;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
`

export default ViewMode
