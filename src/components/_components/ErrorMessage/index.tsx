import styled from 'styled-components'

type ErrorMessageProps = {
  message?: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <Container>{message}</Container>
}

export default ErrorMessage

const Container = styled.div`
  display: flex;
  justify-content: start;
  font-size: 0.875rem;
  color: #d92222;
`
