'use client'

import styled from 'styled-components'
import EmptyIcon from '@/assets/empty_profile.svg'
import LetterIcon from '@/assets/letter.svg'

function ProfilePage() {
  return (
    <Container>
      <EmptyIcon />
      <h2>teaaaa</h2>
      <p>레알팬입니다~</p>
      <button type="button">
        <LetterIcon />
        쪽지 보내기
      </button>
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    background-color: #f0f0f0;
    width: 500px;
    height: 500px;
    border-radius: 8px;
  }

  h2 {
    margin: 20px 0 10px 0;
    font-size: 68px;
    font-weight: 800;
  }

  p {
    margin: 0;
    font-size: 34px;
    font-weight: 400;
  }

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 400px;
    margin: 50px;
    background-color: black;
    color: white;
    font-size: 17px;
    font-weight: 600;
    padding: 15px 40px;
  }
`
