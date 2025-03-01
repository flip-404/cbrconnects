import useUser from '@/hooks/useUser'
import api from '@/libs/axiosInstance'
import { PostWithRelations } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'

type CommentData = {
  content: string
  post_id: number
  author_id: string
  parent_id: number | null
}
interface WriteInputProps {
  post: PostWithRelations
  parentId: number | null
}

function WriteInput({ post, parentId = null }: WriteInputProps) {
  const [comment, setComment] = useState('')
  const { user } = useUser()
  const queryClient = useQueryClient()

  const { mutate: writeComment } = useMutation({
    mutationFn: (newComment: CommentData) => api.post('/comments', newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', post.id.toString()],
      })

      setComment('')
    },
  })

  const onClickWrite = () => {
    if (!user) return

    writeComment({
      content: comment,
      post_id: post.id,
      author_id: user?.id,
      parent_id: parentId,
    })
  }

  return (
    <Container>
      <Label>{parentId ? '답' : '댓'}글 남기기</Label>
      <Input
        disabled={!Boolean(user)}
        placeholder={!Boolean(user) ? '로그인이 필요합니다.' : '댓글을 작성해주세요.'}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <ButtonWrapper>
        <Button disabled={!Boolean(user)} onClick={onClickWrite}>
          등록하기
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

export default WriteInput

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 5px;
  color: #3c3c4366;
  font-size: 14px;
`
