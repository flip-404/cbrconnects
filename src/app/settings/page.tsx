'use client'

import styled from 'styled-components'
import EmptyImage from '@/assets/empty_profile.svg'
import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type UserProfile = {
  profile_image: string | null
  email: string
  nickname: string
  description: string | null
}

function Settings() {
  const { user } = useUser()
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profile_image: '',
    email: '',
    nickname: '',
    description: '',
  })
  // React의 useState는 초기값만 한 번 설정될 뿐, 이후에는 자동으로 업데이트되지 않는다
  // 이후 user 값이 들어와도, useState는 userProfile을 자동으로 업데이트하지 않음. useState는 초기 렌더링 시 지정된 값만 기억하고 유지

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) // 선택한 이미지의 URL 생성
      setUserProfile((prev) => ({
        ...prev,
        profile_image: imageUrl,
      }))
    }
  }

  useEffect(() => {
    if (user) {
      setUserProfile({
        profile_image: user.profile_image,
        email: user.email,
        nickname: user.nickname,
        description: user.description,
      })
    }
  }, [user])

  return (
    <Container>
      <h3>프로필 수정</h3>
      <div>
        <ImageEdit>
          {userProfile?.profile_image ? (
            <Image
              src={userProfile?.profile_image}
              alt={`${userProfile.nickname}'s profile image`}
              width={300}
              height={300}
            />
          ) : (
            <EmptyImage />
          )}
          <h3>프로필 사진 변경</h3>
          <ProfileSelect>
            <label htmlFor="profileImage">
              파일 선택
              <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </ProfileSelect>
          <ImageDeleteCheckbox>
            <label htmlFor="basic-checkbox">
              <input type="checkbox" id="basic-checkbox" />
              <span>프로필 사진 비우기</span>
            </label>
          </ImageDeleteCheckbox>
        </ImageEdit>
        <DetailEdit>
          <SettingInput>
            <p>이메일</p>
            <input type="text" value={userProfile.email} disabled />
          </SettingInput>
          <SettingInput>
            <p>닉네임</p>
            <input
              type="text"
              value={userProfile.nickname}
              onChange={(e) => {
                setUserProfile({ ...userProfile, nickname: e.target.value })
              }}
            />
          </SettingInput>
          <SettingInput>
            <p>한 줄 소개</p>
            <input
              type="text"
              value={userProfile.description || ''}
              onChange={(e) => {
                setUserProfile({ ...userProfile, description: e.target.value })
              }}
            />
          </SettingInput>
          <Controls>
            <button type="submit">저장</button>
            <button type="button">캔버라커넥트 탈퇴</button>
          </Controls>
        </DetailEdit>
      </div>
    </Container>
  )
}

export default Settings

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h3 {
    width: 1300px;
    font-size: 38px;
    font-weight: 800;
  }

  & > div {
    width: 1300px;
    display: flex;
  }
`

const ImageEdit = styled.div`
  width: 300px;
  margin-right: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    object-fit: cover;
  }

  svg {
    width: 300px;
    height: 300px;
    background-color: #f0f0f0;
  }

  & > h3 {
    margin: 40px 0 0 0;
  }

  & > div {
  }
`

const ProfileSelect = styled.div`
  margin-top: 5px;
  display: flex;

  label {
    border-radius: 8px;
    padding: 0px 10px;
    color: white;
    background-color: #787880;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    & > input {
      display: none;
    }
  }
`

const ImageDeleteCheckbox = styled.div`
  margin-top: 10px;

  & > label {
    display: flex;
    align-items: center;

    input {
      margin: 0 5px 0 0;
      width: 16px;
      height: 16px;
    }
  }
`

const DetailEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;

  button {
    all: unset;
    border-radius: 4px;
    padding: 10px 20px;
    background-color: #007aff;
    font-weight: 600;
    color: white;
  }
`
const SettingInput = styled.div`
  margin-bottom: 16px;

  p {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
  }

  input {
    border: 1px solid rgba(60, 60, 67, 0.15);
    padding: 5px;
    width: 360px;
    font-size: 17px;
    font-weight: 400;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    &::placeholder {
      color: rgba(60, 60, 67, 0.3);
    }

    &:hover {
      border-color: #3399ff;
    }

    &:focus {
      border-color: #3399ff;
      box-shadow: 0 0 0 3px #b6daff;
    }

    &:focus-visible {
      outline: 0;
    }
  }
`
