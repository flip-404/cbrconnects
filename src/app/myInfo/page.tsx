'use client'

import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import EmptyProfile from '@/assets/empty_profileImg_icon.svg'
import UpdateImageIcon from '@/assets/update_profile.svg'

function MyInfo() {
  const { data: session } = useSession()

  if (session && session.user)
    return (
      <Container>
        <LeftSideBar>
          <UserProfile>
            <ImageWrapper>
              <ImageLabel htmlFor="profile-image">
                {session!.user.profileImage ? (
                  <>
                    <ProfileImage
                      src={session!.user.profileImage || EmptyProfile}
                      alt="Profile"
                    />
                  </>
                ) : (
                  <EmptyProfile />
                )}
              </ImageLabel>
              <UpdateImageIcon />
            </ImageWrapper>
            {session!.user.nickname} 님
          </UserProfile>
          <MyPosting>
            내가 작성한 게시글 <span>5개</span>
          </MyPosting>
          <MyPosting>
            내가 작성한 댓글 <span>4개</span>
          </MyPosting>
          <Tabs>
            <Tab $active>내 정보 수정</Tab>
            <Tab>작성한 게시글</Tab>
            <Tab>작성한 댓글</Tab>
          </Tabs>
        </LeftSideBar>
        <Body>ㅇㅇ</Body>
      </Container>
    )
  return <></>
}

export default MyInfo

const Container = styled.div`
  padding-top: 36px;
  padding-bottom: 85px;
  padding-left: 88px;
  display: flex;
  gap: 180px;
`

const LeftSideBar = styled.div`
  padding: 57px 47px 122px 47px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  background-color: #fafafa;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const Body = styled.div``

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  font-family: NanumSquare Neo;
  font-size: 18px;
  font-weight: 700;
  line-height: 19.89px;
  text-align: center;
`

const ImageWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  & > svg {
    position: absolute;
    top: 120px;
    left: 118px;
  }
`
const ImageLabel = styled.label`
  border-radius: 50%;

  display: inline-block;
  width: 152px;
  height: 152px;

  overflow: hidden;
  position: relative;
`

const ProfileImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MyPosting = styled.div`
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.65px;
  letter-spacing: -0.022em;
  text-align: left;
  color: #666666;

  span {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 25.65px;
    letter-spacing: -0.022em;
    text-align: left;
  }
`

const Tabs = styled.div`
  border-top: 1px solid #dbdde3;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Tab = styled.div<{ $active?: boolean }>`
  font-family: NanumSquare Neo;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.$active ? '#FAFAFA' : '#000000')};
  background-color: ${(props) => (props.$active ? '#2B2B2B' : 'transparent')};
  width: 236px;
  display: flex;
  justify-content: center;
  padding: 13px 0px;
  border-radius: 8px;
`
