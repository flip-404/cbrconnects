import styled from 'styled-components'

type NotificationModalProps = {
  label: string
  onClose: () => void
}

function NotificationModal({ label, onClose }: NotificationModalProps) {
  return (
    <>
      <Overlay />
      <ModalContainer>
        <ContentWrapper>
          <Label>{label}</Label>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ContentWrapper>
      </ModalContainer>
    </>
  )
}

export default NotificationModal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: #4a5568; /* slate-700 */
  z-index: 10;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background-color: #f8fafc; /* slate-50 */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

const Label = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`

const CloseButton = styled.button`
  background-color: #cbd5e0; /* slate-300 */
  color: #1a202c; /* black */
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #4a5568; /* slate-700 */
    color: #fff; /* white */
  }
`
