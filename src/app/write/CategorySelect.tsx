import styled from 'styled-components'
import BottomArrowIcon from '@/assets/bottomArrow_icon.svg'
import NavsData from '@/mocks/NavsData'
import { useState, useMemo } from 'react'
import Options from './Options'

function CategorySelect({
  defaultLabel,
  type,
  mainCategory,
  subCategory,
  onCgChange,
}: {
  defaultLabel: string
  type: 'mainCategory' | 'subCategory'
  mainCategory: null | string
  subCategory: null | string
  onCgChange: (value: null | string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const isSubCategoryDisabled =
    (!mainCategory && type === 'subCategory') ||
    (mainCategory === '쿼카마켓' && type === 'subCategory')

  const categories = useMemo(() => {
    if (type === 'mainCategory') return NavsData.map((cg) => cg.label)

    return NavsData.find((cg) => cg.label === mainCategory)?.submenu.map(
      (cg) => cg.label,
    )
  }, [type, mainCategory])

  const renderLabel = () => {
    if (type === 'subCategory' && mainCategory === '쿼카마켓') return '쿼카마켓'
    if (type === 'mainCategory') return mainCategory || defaultLabel
    return subCategory || defaultLabel
  }

  return (
    <Container disabled={isSubCategoryDisabled}>
      <SelectButton onClick={toggleDropdown} disabled={isSubCategoryDisabled}>
        {renderLabel()}
        <BottomArrowIcon />
      </SelectButton>

      {isOpen && categories && (
        <Options
          selectedCg={type === 'mainCategory' ? mainCategory : subCategory}
          categories={categories}
          onCgChange={onCgChange}
          toggleDropdown={toggleDropdown}
        />
      )}
    </Container>
  )
}

export default CategorySelect

const Container = styled.div<{ disabled: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#f9f9f9' : 'transparent')};
  border-bottom: 1px solid #dedede;
  position: relative;
`

const SelectButton = styled.button<{ disabled: boolean }>`
  all: unset;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  color: ${({ disabled }) => (disabled ? '#787878' : 'black')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
