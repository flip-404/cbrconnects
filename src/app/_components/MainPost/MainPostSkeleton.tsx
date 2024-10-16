/* eslint-disable react/no-array-index-key */

'use client'

import styled, { keyframes } from 'styled-components'

export default function MainPostSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Post key={index}>
          <NumberSkeleton />
          <Content>
            <TitleSkeleton />
            <DetailSkeleton />
          </Content>
        </Post>
      ))}
    </>
  )
}

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const Skeleton = styled.div`
  animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
`

const Post = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 18px 20px 18px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #d5d5d580;
  }
`

const NumberSkeleton = styled(Skeleton)`
  width: 28px;
  height: 28px;
  border-radius: 999px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const TitleSkeleton = styled(Skeleton)`
  width: 150px;
  height: 16px;
`

const DetailSkeleton = styled(Skeleton)`
  width: 100px;
  height: 14px;
`
