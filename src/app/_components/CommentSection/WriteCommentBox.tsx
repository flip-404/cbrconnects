import { useSession } from 'next-auth/react'
import { useState } from 'react'
import styled from 'styled-components'

function WriteCommentBox({
  handdleWriteComment,
  parentId,
}: {
  handdleWriteComment?: (content: string, parentId: number | null) => void
  parentId: number | null
}) {
  const [content, setContent] = useState('')

  const { data: session } = useSession()

  return (
    <Container>
      <Author>{session?.user.nickname}</Author>
      <Input
        placeholder="댓글을 남겨보세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <ButtonWrapper>
        {handdleWriteComment && (
          <WriteButton
            onClick={() => {
              const tempContent = content
              setContent('')
              handdleWriteComment(tempContent, parentId)
            }}
          >
            등록
          </WriteButton>
        )}
      </ButtonWrapper>
    </Container>
  )
}

export default WriteCommentBox

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0px 12px 0px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 15px;
  font-size: 13px;
  gap: 0.5rem;
`

const Author = styled.span`
  font-size: 13px;
  font-weight: 600;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 15px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`

const WriteButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  border: none;
  background: transparent;
  font-weight: 700;
`
