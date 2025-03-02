'use client'

import styled from 'styled-components'
import EmptyIcon from '@/assets/empty_profile.svg'
import LetterIcon from '@/assets/letter.svg'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'

function ProfilePage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn: ({ queryKey }) => api.get(`/profile?userId=${queryKey[1]}`),
  })

  const user = data?.data?.user

  return (
    <Container>
      {user?.profile_image ? (
        <div>
          <Image
            width={500}
            height={500}
            alt={`${user.nickname}의 프로필 사진`}
            src={user?.profile_image}
          />
        </div>
      ) : (
        <EmptyIcon />
      )}

      <h2>{user?.nickname}</h2>
      <p>{user?.description}</p>
      <button type="button">
        <LetterIcon />
        쪽지 보내기
      </button>
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  position: relative;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    width: 500px;
    height: 500px;
    border-radius: 8px;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }

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
