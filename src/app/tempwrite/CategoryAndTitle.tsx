import styled from 'styled-components'
import NavsData from '@/mocks/NavsData'
import { useEffect, useState } from 'react'
import CategorySelect from './CategorySelect'

type Category = {
  mainCategory: string | null
  subCategory: string | null
}

function CategoryAndTitle({
  mainCategory,
  subCategory,
  onMainCgChange,
  onSubCgChange,
}: {
  mainCategory: string | null
  subCategory: string | null
  onMainCgChange: (value: null | string) => void
  onSubCgChange: (value: null | string) => void
}) {
  useEffect(() => {
    onSubCgChange(null)
  }, [mainCategory])

  return (
    <Container>
      <SelectWrapper>
        <CategorySelect
          type="mainCategory"
          mainCategory={mainCategory}
          subCategory={subCategory}
          onCgChange={onMainCgChange}
        />
        <CategorySelect
          type="subCategory"
          mainCategory={mainCategory}
          subCategory={subCategory}
          onCgChange={onSubCgChange}
        />
      </SelectWrapper>
    </Container>
  )
}

export default CategoryAndTitle

const Container = styled.div`
  width: 80vw;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 0px #0000000d;
`

const SelectWrapper = styled.div`
  display: flex;
  gap: 45px;
  margin: 25px 33px;
`
