import React, { useState } from 'react'
import Agreement from '@/mocks/AgreementData'
import styled from 'styled-components'
import CheckBox from './CheckBox'

function AgreementBox() {
  const [agreement, setAgreement] = useState({
    allChecked: false,
    ageChecked: false,
    serviceChecked: false,
    privacyChecked: false,
  })

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    setAgreement({
      allChecked: isChecked,
      serviceChecked: isChecked,
      privacyChecked: isChecked,
      ageChecked: isChecked,
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setAgreement((prevAgreement) => ({
      ...prevAgreement,
      [name]: checked,
    }))
  }

  return (
    <Container>
      <CheckBox
        name="checkAll"
        checked={agreement.allChecked}
        label="체크버튼 전체 동의"
        handleChange={handleCheckAll}
      />
      <CheckBox
        name="ageChecked"
        checked={agreement.ageChecked}
        label="만 14세 이상입니다."
        handleChange={handleCheckboxChange}
      />
      <CheckBox
        name="serviceChecked"
        checked={agreement.serviceChecked}
        label="서비스 이용약관에 동의합니다."
        handleChange={handleCheckboxChange}
        fullText={Agreement.serviceAgreement}
      />
      <CheckBox
        name="privacyChecked"
        checked={agreement.privacyChecked}
        label="개인정보 수집 및 이용에 동의합니다."
        handleChange={handleCheckboxChange}
        fullText={Agreement.privacyAgreement}
      />
    </Container>
  )
}

export default AgreementBox

const Container = styled.div`
  background-color: #f8f9fb;
  padding: 1rem;
  border-radius: 10px;
`
