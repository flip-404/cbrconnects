import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import useUser from '../hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import EmptyProfileIcon from '@/assets/empty_profile.svg'
import LikeIcon from '@/assets/like.svg'
import CommentSection from './_components/CommentSection'
import { CommentProvider } from '@/contexts/commentContext'

function PostViewer() {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => api.get(`/posts/${postId}`),
    enabled: !!postId,
  })

  const post = data?.data

  return (
    <Container>
      {post && (
        <>
          {' '}
          <Viwer>
            <Category>{post.category}</Category>
            <h1>{post.title}</h1>
            <AuthorProfile>
              {false ? (
                <img src={post.author.profile_image} alt="profile" />
              ) : (
                <EmptyProfileIcon />
              )}
              <div>
                <p>{post.author.nickname}</p>
                <span>
                  {post.author.description || '입력된 자기소개가 없습니다.'}
                </span>
              </div>
            </AuthorProfile>
            <Details>
              <p>
                {post.created_at} · {post.view_count} views
              </p>
              {user?.id === post.author.id && (
                <div>
                  <button>수정하기</button>
                  <button>삭제하기</button>
                </div>
              )}
            </Details>
            <Content>{post.content}</Content>
            <Like>
              <button>
                <LikeIcon /> 좋아요
              </button>
              <span>{post.likes_count}명이 이 글을 좋아합니다</span>
            </Like>
          </Viwer>
          <CommentProvider>
            <CommentSection post={post} comments={post.comments} />
          </CommentProvider>
        </>
      )}
    </Container>
  )
}

export default PostViewer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Viwer = styled.div`
  margin-top: 70px;
  width: 700px;

  h1 {
    margin: 10px 0 30px -3px;

    font-size: 50px;
    font-weight: 700;
  }

  svg {
    border-radius: 4px;
    width: 70px;
    height: 70px;
    background-color: #d8d8d8;
  }
`
const Category = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
`
const AuthorProfile = styled.div`
  display: flex;
  gap: 15px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5;

    p {
      margin: 0;
      font-size: 17px;
      font-weight: 600;
    }

    span {
      color: #3c3c4399;
      font-size: 15px;
      font-weight: 400;
    }
  }
`
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3c3c4399;
  margin-bottom: 30px;
  height: 30px;

  p {
    margin: 0;
    font-size: 11px;
    font-weight: 400;
  }

  button {
    all: unset;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    margin-left: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`
const Content = styled.div``

const Like = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1px solid #ffcc00;
    border-radius: 4px;
    padding: 5px 10px;
    color: #ffcc00;
    font-size: 17px;
    font-weight: 700;

    svg {
      background-color: transparent;
      width: 23px;
      height: 23px;
      margin-right: 5px;

      path {
        background-color: #ffcc00;
      }
    }
  }

  span {
    letter-spacing: 0.5px;
    margin-left: 5px;
    font-size: 13px;
    font-weight: 600;
  }
`
