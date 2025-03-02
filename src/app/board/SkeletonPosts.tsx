/* eslint-disable react/no-array-index-key */
import styled from 'styled-components'

function SkeletonPost() {
  return (
    <SkeletonWrapper>
      <SkeletonCommentCount />
      <SkeletonTitle />
      <SkeletonMeta />
      <SkeletonLikes />
    </SkeletonWrapper>
  )
}

function SkeletonPosts({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPost key={index} />
      ))}
    </>
  )
}

const SkeletonWrapper = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #f0f0f0;
  border-radius: 5px;
  padding: 15px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`

const SkeletonCommentCount = styled.div`
  width: 50px;
  height: 10px;
  background: #ddd;
  border-radius: 4px;
`

const SkeletonTitle = styled.div`
  width: 80%;
  height: 12px;
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
`

const SkeletonMeta = styled.div`
  width: 60%;
  height: 9px;
  background: #ddd;
  border-radius: 4px;
`

const SkeletonLikes = styled.div`
  width: 100px;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  margin-top: 10px;
`

export default SkeletonPosts
