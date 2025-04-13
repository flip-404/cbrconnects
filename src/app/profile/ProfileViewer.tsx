'use client'

import styled from 'styled-components'
import EmptyIcon from '@/assets/empty_profile.svg'
import LetterIcon from '@/assets/letter.svg'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import Link from 'next/link'
import useUser from '@/hooks/useUser'

function ProfileViewer() {
  const searchParams = useSearchParams()
  const profileUserId = searchParams.get('userId')
  const { user } = useUser()
  const { data } = useQuery({
    queryKey: ['profile', profileUserId],
    queryFn: ({ queryKey }) => api.get(`/profile?userId=${queryKey[1]}`),
  })

  const profileUser = data?.data?.user

  return (
    <Container>
      {profileUser?.profile_image ? (
        <div>
          <Image
            width={500}
            height={500}
            alt={`${profileUser.nickname}의 프로필 사진`}
            src={profileUser?.profile_image}
          />
        </div>
      ) : (
        <EmptyIcon />
      )}

      <h2>{profileUser?.nickname}</h2>
      <p>{profileUser?.description}</p>
      <Link
        href={`/message/send?userId=${profileUserId}&nickname=${profileUser?.nickname}`}
        onClick={(event) => {
          if (!user || user.id === profileUserId) {
            event.preventDefault()
            console.log('링크 클릭이 비활성화되었습니다.')
          }
        }}
        style={{
          ...(!user || user.id === profileUserId ? { pointerEvents: 'none', opacity: 0.5 } : {}),
        }}
      >
        <LetterIcon />
        쪽지 보내기
      </Link>
    </Container>
  )
}

export default ProfileViewer

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

  a {
    text-decoration: none;
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

  @media (max-width: 1200px) {
    & > div {
      max-width: 100%;
      height: auto;

      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }

    h2 {
      font-size: 32px;
      font-weight: 800;
    }

    & > svg {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }

    a {
      font-size: 12px;
    }
  }
`
