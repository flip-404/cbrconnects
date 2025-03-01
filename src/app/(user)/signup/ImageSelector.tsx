import styled from 'styled-components'
import PlusIcon from '@/assets/desktop/plus_icon.svg'

export default function ImageSelector({
  handleImageChange,
  profileImage,
}: {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  profileImage: null | string
}) {
  return (
    <ProfileImageWrapper>
      <ImageInput type="file" id="profile-image" accept="image/*" onChange={handleImageChange} />
      <ImageLabel htmlFor="profile-image">
        {profileImage ? <ProfileImage src={profileImage} alt="Profile" /> : <PlusIcon />}
      </ImageLabel>
      <StyledLabel>프로필 사진 (선택)</StyledLabel>
    </ProfileImageWrapper>
  )
}

const ProfileImageWrapper = styled.div`
  margin-top: 11px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageInput = styled.input`
  display: none;
`

const ImageLabel = styled.label`
  background-color: #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: relative;

  &:hover {
    opacity: 0.8;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const StyledLabel = styled.label`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
