import styled, { keyframes } from 'styled-components'

function PostViewerSkeleton() {
  return (
    <Container>
      <SkeletonWrapper>
        <CategorySkeleton />
        <TitleSkeleton />
        <PostDetailSkeleton>
          <TextSkeleton />
          <IconGroupSkeleton>
            <IconSkeleton />
            <IconSkeleton />
            <IconSkeleton />
          </IconGroupSkeleton>
        </PostDetailSkeleton>
        <ContentSkeleton />
        <ReactionSkeleton>
          <LikeSkeleton />
          <CommentCountSkeleton />
        </ReactionSkeleton>
      </SkeletonWrapper>
    </Container>
  )
}

export default PostViewerSkeleton

const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const Container = styled.div`
  padding-top: 24px;
`

const SkeletonWrapper = styled.div`
  padding: 28px 18px;
  border: 1px solid #dfdfdf;
  border-radius: 16px;
`

const SkeletonBox = styled.div`
  display: inline-block;
  background: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  animation: ${skeletonAnimation} 1.5s infinite linear;
`

const CategorySkeleton = styled(SkeletonBox)`
  width: 100px;
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
`

const TitleSkeleton = styled(SkeletonBox)`
  width: 70%;
  height: 24px;
  margin-bottom: 14px;
  border-radius: 6px;
`

const PostDetailSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const TextSkeleton = styled(SkeletonBox)`
  width: 150px;
  height: 16px;
  border-radius: 4px;
`

const IconGroupSkeleton = styled.div`
  display: flex;
  gap: 12px;
`

const IconSkeleton = styled(SkeletonBox)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const ContentSkeleton = styled(SkeletonBox)`
  width: 100%;
  height: 150px;
  margin-bottom: 16px;
  border-radius: 10px;
`

const ReactionSkeleton = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const LikeSkeleton = styled(SkeletonBox)`
  width: 40px;
  height: 16px;
  border-radius: 4px;
`

const CommentCountSkeleton = styled(SkeletonBox)`
  width: 40px;
  height: 16px;
  border-radius: 4px;
`
