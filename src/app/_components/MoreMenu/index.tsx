/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components'
import MoreIcon_ from '@/assets/desktop/more_icon.svg'

type NullableNumber = number | null

type MoreMenuProps = {
  targetId: NullableNumber
  handleMoreMenu: (targetId: NullableNumber) => void
  currentId: NullableNumber
  handleEditButton?: any
  handleDeleteButton?: any
}

function MoreMenu({
  targetId,
  handleMoreMenu,
  currentId,
  handleEditButton,
  handleDeleteButton,
}: MoreMenuProps) {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <MoreIcon
        width={24}
        height={24}
        onClick={() => {
          handleMoreMenu(targetId)
        }}
      />
      {currentId === targetId && (
        <ControlWrapper>
          <CommentControl onClick={handleEditButton}>수정</CommentControl>
          <CommentControl onClick={handleDeleteButton}>삭제</CommentControl>
        </ControlWrapper>
      )}
    </Container>
  )
}

export default MoreMenu

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: black;
`
const MoreIcon = styled(MoreIcon_)`
  cursor: pointer;
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  border: 1px solid black;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background-color: white;
`

const CommentControl = styled.div`
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`
