import { useState } from 'react'
import styled from 'styled-components'
import AgreementModal from './AgreementModal'

type CheckBoxProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  name: string
  label: string
  fullText?: string
}

function CheckBox({ name, label, checked, handleChange, fullText }: CheckBoxProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }
  return (
    <Container>
      <CheckboxWrapper type={name}>
        <input type="checkbox" id={name} name={name} checked={checked} onChange={handleChange} />
        <label htmlFor={name}>
          {label} {name !== 'checkAll' && <span>(필수)</span>}
        </label>
      </CheckboxWrapper>
      {fullText && <ShowAgreement onClick={toggleModal}>전문보기</ShowAgreement>}
      {fullText && isModalOpen && <AgreementModal toggleModal={toggleModal} content={fullText} />}
    </Container>
  )
}

export default CheckBox

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShowAgreement = styled.p`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  color: #979797;
  text-decoration: underline;
  margin: 0px;

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

const CheckboxWrapper = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 14px;

  input {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 1px solid #d8d8d8;
    margin: 0px;
  }

  label {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: ${(props) => (props.type === 'checkAll' ? '500' : '400')};
    text-align: left;
    color: black;
  }

  span {
    color: #1b3be6;
  }
`
