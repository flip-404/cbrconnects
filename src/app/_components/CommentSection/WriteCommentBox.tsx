import { useState } from 'react'
import styled from 'styled-components'

interface WriteCommentBoxProps {
  handleWriteComment?: (
    content: string,
    parentId: number | null,
    type: 'edit' | 'write',
  ) => void
  handleEditComment?: (content: string, commentId: number) => void
  offEditMode?: () => void
  parentId: number | null
  commentId?: number | null
  isEditMode: boolean
  prevContent?: string
  disabled?: boolean
}

function WriteCommentBox({
  handleWriteComment,
  handleEditComment,
  offEditMode,
  parentId,
  commentId,
  isEditMode,
  prevContent = '',
  disabled = false,
}: WriteCommentBoxProps) {
  const [content, setContent] = useState(prevContent)

  const handleSubmit = () => {
    const tempContent = content
    setContent('')

    if (isEditMode && handleEditComment && offEditMode) {
      handleEditComment(tempContent, commentId!)
      offEditMode()
    } else if (handleWriteComment) {
      handleWriteComment(tempContent, parentId, isEditMode ? 'edit' : 'write')
    }
  }

  return (
    <Container>
      <Label>댓글 남기기</Label>
      <Input
        disabled={disabled}
        placeholder={disabled ? '로그인이 필요합니다.' : '댓글을 작성해주세요.'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonWrapper>
        {isEditMode && <Button onClick={offEditMode}>취소</Button>}
        <Button disabled={disabled} onClick={handleSubmit}>
          {isEditMode ? '수정하기' : '등록하기'}
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

export default WriteCommentBox

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 10px;
  gap: 8px;
`

const Label = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: #7a7a7a;
`

const Input = styled.textarea<{ disabled: boolean }>`
  all: unset;
  padding: 7.76px;
  border-radius: 5.17px;
  background: #f9f9f9;
  border: 0.65px solid #bfbfbf;
  min-height: 60px;

  &:focus {
    background: white;
    outline: 0.65px solid #436af5;
  }

  @media (max-width: 768px) {
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button<{ disabled?: boolean }>`
  all: unset;
  cursor: pointer;
  padding: 7.5px 18px;
  background: #d9e1fd;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  color: #222222;
  border-radius: 7px;

  @media (max-width: 768px) {
    background: #64748b;
    color: #eef1f6;
  }

  ${(props) =>
    props.disabled && {
      ...{
        cursor: 'default',
        background: '#C1C7D1',
        color: '#EEF1F6',
      },
    }}
`
