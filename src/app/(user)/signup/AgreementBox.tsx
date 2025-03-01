import React, { useEffect, useState } from 'react'
import Agreement from '@/mocks/AgreementData'
import styled from 'styled-components'
import CheckBox from './CheckBox'

function AgreementBox({
  setAllAgreementChecked,
}: {
  setAllAgreementChecked: (checked: boolean) => void
}) {
  const [agreement, setAgreement] = useState({
    ageChecked: false,
    serviceChecked: false,
    privacyChecked: false,
  })

  const allChecked = agreement.ageChecked && agreement.serviceChecked && agreement.privacyChecked

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked

    setAgreement({
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

  useEffect(() => {
    setAllAgreementChecked(allChecked)
  }, [allChecked, setAllAgreementChecked])

  return (
    <Container>
      <AllCheckWrapper>
        <CheckBox
          name="checkAll"
          checked={allChecked}
          label="모두 동의합니다."
          handleChange={handleCheckAll}
        />
      </AllCheckWrapper>

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
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AllCheckWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
`
