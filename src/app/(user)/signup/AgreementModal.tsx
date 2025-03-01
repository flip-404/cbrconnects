import styled from 'styled-components'

function AgreementModal({ toggleModal, content }: { toggleModal: () => void; content: string }) {
  return (
    <ModalOverlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <TextBlock>{content}</TextBlock>
          <CloseButton onClick={toggleModal}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 50%;
  height: 30%;
  overflow-y: scroll;
  overflow-x: hidden;
`

const TextBlock = styled.pre`
  white-space: pre-wrap;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CloseButton = styled.button``

export default AgreementModal
