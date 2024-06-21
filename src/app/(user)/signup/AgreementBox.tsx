import React, { useState } from 'react'

function AgreementBox() {
  const [agreement, setAgreement] = useState({
    allChecked: false,
    ageChecked: false,
    serviceChecked: false,
    privacyChecked: false,
    marketingChecked: false,
  })

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked
    setAgreement({
      allChecked: isChecked,
      ageChecked: isChecked,
      serviceChecked: isChecked,
      privacyChecked: isChecked,
      marketingChecked: agreement.marketingChecked,
    })
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setAgreement((prevAgreement) => ({
      ...prevAgreement,
      [name]: checked,
    }))
  }

  return (
    <div>
      <input
        type="checkbox"
        id="checkAll"
        name="checkAll"
        checked={agreement.allChecked}
        onChange={handleCheckAll}
      />
      <label htmlFor="checkAll">체크버튼 전체 동의</label>
      <br />

      <input
        type="checkbox"
        id="ageChecked"
        name="ageChecked"
        checked={agreement.ageChecked}
        onChange={handleCheckboxChange}
        required
      />
      <label htmlFor="ageChecked">
        체크버튼 [필수] 만 14세 이상 회원입니다.
      </label>
      <br />

      <input
        type="checkbox"
        id="serviceChecked"
        name="serviceChecked"
        checked={agreement.serviceChecked}
        onChange={handleCheckboxChange}
        required
      />
      <label htmlFor="serviceChecked">
        체크버튼 [필수] 클라썸 서비스 이용약관에 동의합니다.
      </label>
      <br />

      <input
        type="checkbox"
        id="privacyChecked"
        name="privacyChecked"
        checked={agreement.privacyChecked}
        onChange={handleCheckboxChange}
        required
      />
      <label htmlFor="privacyChecked">
        체크버튼 [필수] 클라썸 개인정보 수집 및 이용에 동의합니다.
      </label>
      <br />

      <input
        type="checkbox"
        id="marketingChecked"
        name="marketingChecked"
        checked={agreement.marketingChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="marketingChecked">
        체크버튼 [선택] 마케팅 정보 수신에 동의합니다.
      </label>
      <br />
    </div>
  )
}

export default AgreementBox
