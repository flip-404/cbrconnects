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

function CheckBox({
  name,
  label,
  checked,
  handleChange,
  fullText,
}: CheckBoxProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }
  return (
    <Container>
      <div>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {fullText && (
        <ShowAgreement onClick={toggleModal}>전문보기</ShowAgreement>
      )}
      {fullText && isModalOpen && (
        <AgreementModal toggleModal={toggleModal} content={fullText} />
      )}
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
  font-weight: 400;
  font-size: 14px;
  color: #3b4859;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
