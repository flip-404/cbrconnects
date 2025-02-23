import useUser from '@/app/hooks/useUser'
import api from '@/libs/axiosInstance'
import { PostWithRelations } from '@/types'
import { useState } from 'react'
import styled from 'styled-components'

interface WriteInputProps {
  post: PostWithRelations
  parentId: number | null
}

function WriteInput({ post, parentId = null }: WriteInputProps) {
  const [comment, setComment] = useState('')
  const { user } = useUser()

  const onClickWrite = () => {
    api.post('/comments', {
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
        placeholder={
          !Boolean(user) ? '로그인이 필요합니다.' : '댓글을 작성해주세요.'
        }
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
