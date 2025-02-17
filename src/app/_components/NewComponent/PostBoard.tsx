'use client'

import Link from 'next/link'
import styled from 'styled-components'

function PostBoard({ title }: { title: string }) {
  return (
    <>
      <Title href="/freeboard">{title}</Title>
    </>
  )
}

export default PostBoard

const Title = styled(Link)`
  all: unset;
`
