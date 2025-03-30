'use client'

import styled from 'styled-components'
import PostBoard from '@/components/NewComponent/PostBoard'
import PinnedBoard from '@/components/NewComponent/PinnedBoard'
import NewsBoard from '@/components/NewComponent/NewsBoard'
import { boardLinks } from '../../Desktop/DesktopHeader'

export default function DesktopHome() {
  return (
    <Container>
      <Pinned>
        <PinnedBoard />
        <PinnedBoard category={boardLinks[0].category} />
        <PinnedBoard category={boardLinks[4].category} />
        <PinnedBoard />
      </Pinned>
      <NewsBoard />
      <Boards>
        <PostBoard title={boardLinks[1].label} category={boardLinks[1].category} />
        <PostBoard title={boardLinks[2].label} category={boardLinks[2].category} />
        <PostBoard title={boardLinks[3].label} category={boardLinks[3].category} />
      </Boards>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Pinned = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1300px;
  padding: 25px 0;
`

const Boards = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1300px;
`
