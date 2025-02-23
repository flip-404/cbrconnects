import { useRouter } from 'next/navigation'
import styled from 'styled-components'

export default function EditDeleteButtons({
  postId,
  onDelete,
}: {
  postId: number
  onDelete: () => void
}) {
  const router = useRouter()
  return (
    <>
      <UDButton
        onClick={() => router.push(`/write?postId=${postId}&isEditMode=true`)}
      >
        수정
      </UDButton>
      <UDButton onClick={onDelete}>삭제</UDButton>
    </>
  )
}

const UDButton = styled.button`
  all: unset;
  border-radius: 7px;
  display: flex;
  padding: 8px 18px;
  font-size: 14px;
  background: #d9e1fd;
`
