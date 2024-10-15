import styled from 'styled-components'

function SkeletonPostItem() {
  return (
    <>
      {[...Array(5)].map(() => (
        <Container key={Math.random()}>
          <div>
            <SkeletonPostTitle />
            <SkeletonMetaInfo />
          </div>
          <div>
            <SkeletonPostTitle style={{ width: '100px', height: '100px' }} />
          </div>
        </Container>
      ))}
    </>
  )
}

export default SkeletonPostItem

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding: 2px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e8f0;
  background: #f0f0f0;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: #e0e0e0;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
`

const SkeletonPostTitle = styled.div`
  width: 150px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
`

const SkeletonMetaInfo = styled.div`
  width: 100px;
  height: 14px;
  background: #e0e0e0;
  border-radius: 4px;
`
