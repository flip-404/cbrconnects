'use client'

import styled from 'styled-components'
import PlusIcon from '@/assets/mobile/plus.svg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MobileWriteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (isOpen) {
      router.push('/write')
    } else {
      setIsOpen(true)
    }
  }

  return (
    <Button onClick={handleClick} $isOpen={isOpen}>
      <PlusIcon />
      {isOpen && <Text>글쓰기</Text>}
    </Button>
  )
}

const Button = styled.div<{ $isOpen: boolean }>`
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: fixed;
  background: #436af5;
  bottom: 20px;
  right: 16px;
  border-radius: 40px;
  cursor: pointer;
  white-space: nowrap;
  width: ${(props) => (props.$isOpen ? '118px' : '44px')};
  height: 44px;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  transition:
    width 0.3s ease,
    padding 0.3s ease; /* 버튼 크기 변화 애니메이션 */
`

const Text = styled.span`
  opacity: 0;
  animation: fadeIn 0.3s forwards; /* "글쓰기" 텍스트 등장 애니메이션 */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
