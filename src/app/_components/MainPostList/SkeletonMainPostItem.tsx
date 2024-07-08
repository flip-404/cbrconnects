import styled from 'styled-components'

function SkeletonMainPostItem() {
  return (
    <>
      {[...Array(5)].map(() => (
        <Container key={Math.random()}>
          <SkeletonPostTitle />
          <SkeletonPostTitle style={{ width: '100px', height: '10px' }} />
        </Container>
      ))}
    </>
  )
}

export default SkeletonMainPostItem

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
  height: 10px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
`
