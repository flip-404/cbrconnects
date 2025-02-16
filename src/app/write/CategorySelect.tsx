import styled from 'styled-components'
import NavsData from '@/mocks/NavsData'
import { useState, useMemo } from 'react'
import BottomArrowIcon from '@/assets/desktop/bottomArrow_icon.svg'
import Options from './Options'
import type { Category } from './PostEditor'

function CategorySelect({
  categories,
  defaultLabel,
  type,
  mainCategory,
  subCategory,
  onCgChange,
}: {
  categories: Category[]
  defaultLabel: string
  type: 'mainCategory' | 'subCategory'
  mainCategory: Category | null
  subCategory: Category | null
  onCgChange: (value: null | Category) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const isSubCategoryDisabled =
    (!mainCategory && type === 'subCategory') ||
    (mainCategory?.label === '쿼카마켓' && type === 'subCategory')

  const options = useMemo(() => {
    if (type === 'mainCategory')
      return categories

    return categories?
      .find((cg) => cg.id === mainCategory?.id)
      ?.subCategories.map((cg) => ({
        id: cg.id,
        label: cg.label,
      }))
  }, [type, categories, mainCategory])

  const renderLabel = () => {
    if (type === 'subCategory' && mainCategory?.label === '쿼카마켓')
      return mainCategory?.label
    if (type === 'mainCategory') return mainCategory?.label || defaultLabel
    return subCategory?.label || defaultLabel
  }

  return (
    <Container disabled={isSubCategoryDisabled}>
      <SelectButton onClick={toggleDropdown} disabled={isSubCategoryDisabled}>
        {renderLabel()}
        <BottomArrowIcon />
      </SelectButton>

      {isOpen && options && (
        <Options
          selectedCg={
            type === 'mainCategory' ? mainCategory?.id : subCategory?.id
          }
          categories={options}
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
