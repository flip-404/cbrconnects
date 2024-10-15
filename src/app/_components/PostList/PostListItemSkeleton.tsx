// PostListItemSkeleton.tsx
import styled from 'styled-components'

function PostListItemSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonBody>
        <SkeletonTitleWrapper>
          <SkeletonCategoryChip />
          <SkeletonTitle />
        </SkeletonTitleWrapper>
        <SkeletonDetail>
          <SkeletonLeftWrapper>
            <SkeletonCounting />
            <SkeletonSeparator />
            <SkeletonCounting />
          </SkeletonLeftWrapper>
          <SkeletonRightWrapper>
            <SkeletonCounting />
            <SkeletonSeparator />
            <SkeletonCounting />
            <SkeletonCounting />
          </SkeletonRightWrapper>
        </SkeletonDetail>
      </SkeletonBody>
      <SkeletonThumbnail />
    </SkeletonContainer>
  )
}

export default PostListItemSkeleton

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  animation: pulse 1.5s infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;

  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`

const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 7px 0px;
`

const SkeletonTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const SkeletonCategoryChip = styled.div`
  width: 80px;
  height: 20px;
  margin-bottom: 6px;
  border-radius: 4px;
  background: #e0e0e0;
`

const SkeletonTitle = styled.div`
  width: 70%;
  height: 20px;
  margin-bottom: 6px;
  border-radius: 4px;
  background: #e0e0e0;
`

const SkeletonDetail = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  align-items: center;
`

const SkeletonLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const SkeletonRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SkeletonSeparator = styled.div`
  width: 6px;
  height: 14px;
  background: #e0e0e0;
  border-radius: 4px;
`

const SkeletonCounting = styled.div`
  width: 40px; // Example width for counting items
  height: 14px;
  background: #e0e0e0;
  border-radius: 4px;
`

const SkeletonThumbnail = styled.div`
  width: 70px;
  height: 48px;
  background: #e0e0e0;
  border-radius: 6px;
  flex-shrink: 0;
`
