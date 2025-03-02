import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import EmptyProfileIcon from '@/assets/empty_profile.svg'
import LikeIcon from '@/assets/like.svg'
import { CommentProvider } from '@/contexts/commentContext'
import { postlike } from '@prisma/client'
import Image from 'next/image'
import ReactQuill from 'react-quill'
import Link from 'next/link'
import CommentSection from './_components/CommentSection'
import useUser from '../../hooks/useUser'

function PostViewer() {
  const queryClient = useQueryClient()
  const { user } = useUser()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => api.get(`/posts/${postId}`),
    enabled: !!postId,
  })

  const post = data?.data

  const { mutate: likePost } = useMutation({
    mutationFn: ({ userId, postId: mutationPostId }: { userId: string; postId: string }) =>
      api.post('/like', { userId, postId: mutationPostId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      })
    },
  })

  const { mutate: postDelete } = useMutation({
    mutationFn: () => api.delete(`/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      })
      router.push('/board')
    },
  })

  const onClickLike = () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (post.likes.some((like: postlike) => like.user_id === user?.id))
      alert('이미 좋아요를 누르셨습니다.')
    else likePost({ userId: user.id, postId: post.id })
  }

  return (
    <Container>
      {post && (
        <>
          {' '}
          <Viwer>
            <Category>{post.category}</Category>
            <h1>{post.title}</h1>
            <AuthorProfile>
              {post.author.profile_image ? (
                <Image src={post.author.profile_image} alt="프로필 사진" width={70} height={70} />
              ) : (
                <EmptyProfileIcon />
              )}
              <div>
                <Link href={`/profile?userId=${post.author.id}`}>{post.author.nickname}</Link>
                <span>{post.author.description || '입력된 자기소개가 없습니다.'}</span>
              </div>
            </AuthorProfile>
            <Details>
              <p>
                {post.created_at} · {post.view_count} views
              </p>
              {user?.id === post.author.id && (
                <div>
                  <button type="button" onClick={() => {}}>
                    수정하기
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const isConfirmed = window.confirm('정말로 이 게시물을 삭제하시겠습니까?')

                      if (isConfirmed) {
                        postDelete()
                      }
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </Details>

            <Content>
              <ReactQuill
                value={post.content}
                readOnly
                theme="snow"
                modules={{
                  toolbar: false,
                }}
              />
            </Content>
            <Like $isActive={post.likes.some((like: postlike) => like.user_id === user?.id)}>
              <button
                type="button"
                onClick={() => {
                  onClickLike()
                }}
              >
                <LikeIcon /> 좋아요
              </button>
              <span>{post.likes.length}명이 이 글을 좋아합니다</span>
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
`
const Category = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
`
const AuthorProfile = styled.div`
  display: flex;
  gap: 15px;

  & > svg {
    border-radius: 4px;
    width: 70px;
    height: 70px;
    background-color: #d8d8d8;
  }

  & > img {
    border-radius: 4px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5;

    span {
      color: #3c3c4399;
      font-size: 15px;
      font-weight: 400;
    }

    a {
      margin: 0;
      color: black;
      font-size: 17px;
      font-weight: 600;
      text-decoration: none;

      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
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
const Content = styled.div`
  * {
    border: none !important;
    border-image-width: 0 !important;
    outline: none !important;
  }

  div {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`

const Like = styled.div<{ $isActive: boolean }>`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: ${(props) => (props.$isActive ? '1px solid #ffcc00' : '1px solid #3c3c4399')};

    border-radius: 4px;
    padding: 5px 10px;
    color: ${(props) => (props.$isActive ? '#ffcc00' : '#3c3c4399')};

    font-size: 17px;
    font-weight: 700;

    svg {
      background-color: transparent;
      width: 23px;
      height: 23px;
      margin-right: 5px;
      fill: ${(props) => (props.$isActive ? '#ffcc00' : '#3c3c4399')};
    }

    &:hover {
      border: 1px solid #ffcc00;
      color: #ffcc00;
      svg {
        fill: #ffcc00;
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
