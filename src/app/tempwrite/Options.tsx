import styled from 'styled-components'
import CheckIcon from '@/assets/check_icon.svg'

type Props = {
  selectedCg: null | string
  categories: string[] | undefined
  onCgChange: (value: null | string) => void
  toggleDropdown: () => void
}

function Options({
  selectedCg,
  categories,
  onCgChange,
  toggleDropdown,
}: Props) {
  return (
    <Container>
      {categories?.map((label) => (
        <Option
          key={label}
          onClick={() => {
            if (selectedCg !== label) {
              onCgChange(label)
            }
            toggleDropdown()
          }}
          $selected={selectedCg === label}
        >
          {label}
          {selectedCg === label && <CheckIcon />}
        </Option>
      ))}
    </Container>
  )
}

export default Options

const Container = styled.div`
  z-index: 999;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 44px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #d5d5d5;
`

const Option = styled.div<{ $selected: boolean }>`
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => (props.$selected ? '#f3f6ff' : '#ffffff')};
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  color: #3c3c3c;
  border-bottom: 0.8px solid #dedede;
  cursor: pointer;

  &:hover {
    background-color: #f3f6ff;
  }
`
