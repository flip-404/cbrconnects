import styled from 'styled-components'

interface EditModeProps {
  editText: string
  setEditText: React.Dispatch<React.SetStateAction<string>>
  handleEdit: () => void
}

const EditMode = ({ editText, setEditText, handleEdit }: EditModeProps) => (
  <>
    <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
    <ButtonWrapper>
      <EditButton onClick={handleEdit} disabled={!editText}>
        수정하기
      </EditButton>
    </ButtonWrapper>
  </>
)

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
  padding: 7.5px 18px;
  background: #d9e1fd;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  border-radius: 7px;
`

export default EditMode
