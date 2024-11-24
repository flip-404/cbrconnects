'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/close.svg'
import PostViewer from '@/app/posts/PostViewer'

function PostModal({
  onClose,
  postId,
}: {
  onClose: () => void
  postId: number
}) {
  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        <Content>
          <PostViewer modalPostId={postId} />
        </Content>
      </ModalContainer>
    </Overlay>
  )
}

export default PostModal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  min-width: 860px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const Content = styled.div``
