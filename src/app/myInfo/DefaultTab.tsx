'use client'

import styled from 'styled-components'
import EmptyProfile from '@/assets/desktop/empty_profileImg_icon.svg'
import UpdateImageIcon from '@/assets/desktop/update_profile.svg'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import RightArrow from '@/assets/mobile/rightArrow.svg'
import { useMediaQuery } from '@mui/material'
import supabase from '@/libs/supabaseClient'
import useUser from '../hooks/useUser'

function DefaultTab({
  tab,
  onTabChange,
}: {
  tab: number
  onTabChange: (tab: number) => void
}) {
  const { user, logout } = useUser()
  const { data } = useSWR(
    user?.user_id ? `/api/myInfo?authorId=${user?.user_id}` : null,
    fetcher,
  )
  const isMobile = useMediaQuery('(max-width:768px)')

  const { posts = [], comments = [] } = data || {}
  if (user)
    return (
      <>
        <UserProfile>
          <ImageWrapper>
            <ImageLabel htmlFor="profile-image">
              {user.profileImage ? (
                <>
                  <ProfileImage
                    src={user.profileImage || EmptyProfile}
                    alt="Profile"
                  />
                </>
              ) : (
                <EmptyProfile />
              )}
            </ImageLabel>
            <UpdateImageIcon />
          </ImageWrapper>
          {user.nickname} 님
        </UserProfile>
        <MyPostingWrapper>
          <MyPosting>
            내가 작성한 게시글 <span>{posts?.length}개</span>
          </MyPosting>
          <MyPosting>
            내가 작성한 댓글 <span>{comments?.length}개</span>
          </MyPosting>
        </MyPostingWrapper>
        <Tabs>
          <Tab $active={tab === 1} onClick={() => onTabChange(1)}>
            내 정보 수정 {isMobile && <RightArrow />}
          </Tab>
          <Tab $active={tab === 2} onClick={() => onTabChange(2)}>
            작성한 게시글 {isMobile && <RightArrow />}
          </Tab>
          <Tab $active={tab === 3} onClick={() => onTabChange(3)}>
            작성한 댓글 {isMobile && <RightArrow />}
          </Tab>
          {isMobile && (
            <LogoutButton
              onClick={() => {
                supabase.auth.signOut()
                logout()
              }}
            >
              로그아웃
            </LogoutButton>
          )}
        </Tabs>
      </>
    )
}

export default DefaultTab

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

  @media (max-width: 768px) {
    padding-top: 32px;
  }
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

    @media (max-width: 768px) {
      top: 76px;
      left: 78px;
    }
  }
`
const ImageLabel = styled.label`
  border-radius: 50%;

  display: inline-block;
  width: 152px;
  height: 152px;

  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 102px;
    height: 102px;
  }
`

const ProfileImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MyPostingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    margin: 16px 12px;
    border-radius: 6px;
    background: #f7f7f7;
    padding: 12px;
  }
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

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;

    width: 100%;
    color: #505d6f;
    font-weight: 400;
    span {
      font-weight: 500;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 8px;
    }
  }
`

const Tabs = styled.div`
  border-top: 1px solid #dbdde3;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    border: none;
    gap: 12px;
    margin-bottom: 100px;
  }
`

const Tab = styled.div<{ $active?: boolean }>`
  cursor: pointer;
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

  @media (max-width: 768px) {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 13px 16px;
    width: 100%;
    font-family: NanumSquare Neo;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`
const LogoutButton = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin: 12px;
  background-color: #352e2ebd;
  color: white;
  font-family: NanumSquare Neo;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
`
