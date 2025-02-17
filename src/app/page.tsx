'use client'

import { useMediaQuery } from '@mui/material'
import PostBoard from './_components/NewComponent/PostBoard'
import styled from 'styled-components'
import PinnedBoard from './_components/NewComponent/PinnedBoard'
import Promotion from './_components/NewComponent/Promotion'

export default function Home() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Container>
      <Pinned>
        <PinnedBoard isEmpty={true} />
        <PinnedBoard />
        <PinnedBoard />
        <PinnedBoard isEmpty={true} />
      </Pinned>
      <Promotion />
      <Boards>
        <PostBoard title="자유게시판" />
        <PostBoard title="쿼카마켓" />
        <PostBoard title="구인구직" />
      </Boards>
    </Container>
  )
  // return isMobile ? <MobileHome /> : <DesktopHome />
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
