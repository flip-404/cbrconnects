'use client'

import styled from 'styled-components'
import EmptyImage from '@/assets/empty_profile.svg'
import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import api from '@/libs/axiosInstance'

type UserProfile = {
  userId: string
  profileImage: string | null
  email: string
  nickname: string
  description: string | null
}

function Settings() {
  const { user } = useUser()
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: '',
    profileImage: '',
    email: '',
    nickname: '',
    description: '',
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const {
        data: { imageURL },
      } = await api.post('/image', formData)
      setUserProfile((prev) => ({
        ...prev,
        profileImage: imageURL,
      }))
    }
  }

  const onSaveClick = async () => {
    await api.put('/profile', userProfile)
  }

  useEffect(() => {
    if (user) {
      setUserProfile({
        userId: user.id,
        profileImage: user.profile_image,
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
          {userProfile?.profileImage ? (
            <Image
              src={userProfile?.profileImage}
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
            <button
              type="button"
              onClick={() => {
                if (window.confirm('변경된 내용을 저장하시겠습니까?')) onSaveClick()
              }}
            >
              저장
            </button>
            <button type="button">K-캔버라 탈퇴</button>
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
    cursor: pointer;
    border-radius: 4px;
    padding: 10px 20px;
    background-color: #007aff;
    font-weight: 600;
    color: white;

    &:hover {
      opacity: 0.8;
    }
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
