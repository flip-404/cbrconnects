'use client'

import { useSession } from 'next-auth/react'
import styled from 'styled-components'
import EmptyProfile from '@/assets/desktop/empty_profileImg_icon.svg'
import UpdateImageIcon from '@/assets/desktop/update_profile.svg'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

function DefaultTab({
  tab,
  onTabChange,
}: {
  tab: number
  onTabChange: (tab: number) => void
}) {
  const { data: session } = useSession()
  const { data } = useSWR(
    session?.user.id ? `/api/myInfo?authorId=${session?.user.id}` : null,
    fetcher,
  )
  const { posts = [], comments = [] } = data || {}
  if (session && session.user)
    return (
      <>
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
          내가 작성한 게시글 <span>{posts?.length}개</span>
        </MyPosting>
        <MyPosting>
          내가 작성한 댓글 <span>{comments?.length}개</span>
        </MyPosting>
        <Tabs>
          <Tab $active={tab === 1} onClick={() => onTabChange(1)}>
            내 정보 수정
          </Tab>
          <Tab $active={tab === 2} onClick={() => onTabChange(2)}>
            작성한 게시글
          </Tab>
          <Tab $active={tab === 3} onClick={() => onTabChange(3)}>
            작성한 댓글
          </Tab>
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
`
