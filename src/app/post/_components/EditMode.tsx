import styled from 'styled-components'

interface EditModeProps {
  editText: string
  setEditText: React.Dispatch<React.SetStateAction<string>>
  handleEdit: () => void
}

function EditMode({ editText, setEditText, handleEdit }: EditModeProps) {
  return (
    <Container>
      <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
      <ButtonWrapper>
        <EditButton onClick={handleEdit} disabled={!editText}>
          수정하기
        </EditButton>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.textarea`
  all: unset;
  padding: 7.76px;
  border-radius: 5.17px;
  background: #f9f9f9;
  border: 0.65px solid #bfbfbf;
  min-height: 60px;
  &:focus {
    background: white;
    outline: 0.65px solid #436af5;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const EditButton = styled.button`
  all: unset;
  cursor: pointer;
  margin-top: 5px;
  color: #3c3c4366;
  font-size: 14px;
`

export default EditMode
