'use client'

import { CommentWithRelations } from '@/types'
import styled from 'styled-components'

function MyComments({ comments }: { comments: CommentWithRelations[] }) {
  return <Container>{comments.length}</Container>
}

export default MyComments

const Container = styled.div`
  min-width: 890px;
  border: 1px solid #e0e3e8;
  border-radius: 8px;
  padding: 52px 34px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`
