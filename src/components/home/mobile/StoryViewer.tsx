'use client'

import styled from 'styled-components'
import CloseIcon from '@/assets/mobile/story_close.svg'
import { useStories } from '@/hooks/useStories'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/libs/axiosInstance'
import useUser from '@/hooks/useUser'
import ViewsIcon from '@/assets/mobile/views.svg'
import { GET_Stories } from '@/types/newIndex'
import { formatPostDate } from '@/utils/formatDate'

export default function StoryViewer({
  closeViwer,
  clickedIndex,
}: {
  closeViwer: () => void
  clickedIndex: null | number
}) {
  const [comment, setComment] = useState('')
  const [currentIndex, setCurrentIndex] = useState<null | number>(clickedIndex)
  const { user } = useUser()
  const { stories, markAsRead } = useStories()
  const queryClient = useQueryClient()
  const commentSectionRef = useRef<HTMLDivElement>(null)
  const currentStoryId = stories[currentIndex!]?.id

  const { data: storyCommentsData } = useQuery({
    queryKey: ['/stories/comments', currentStoryId],
    queryFn: () => api.get(`/stories/comments?storyId=${currentStoryId}`),
    enabled: !!currentStoryId,
  })

  const storyComments = storyCommentsData?.data?.comments

  const { mutate: storyCommentPost } = useMutation({
    mutationFn: ({ storyId, content }: { storyId: number; content: string }) =>
      api.post('/stories/comments', {
        userId: user?.id,
        content,
        storyId,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['/stories/comments', variables.storyId],
      })
    },
    onSettled: () => {
      setComment('')
    },
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' && comment.trim()) {
      e.preventDefault()
      const storyId = stories[currentIndex!].id
      const content = comment

      storyCommentPost({ storyId, content })
    }
  }

  useEffect(() => {
    if (commentSectionRef.current && storyComments?.length > 0) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight
    }
  }, [storyComments])

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight
    }
  }, [currentIndex])

  if (currentIndex === null) return null
  return (
    <Contaniner
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Header>
        <span>K-캔버라</span>
        <button type="button" aria-label="close storyViewer" onClick={closeViwer}>
          <CloseIcon fill="white" />
        </button>
      </Header>

      <Body>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={currentIndex}
          onSlideChange={(swiper) => {
            const { activeIndex } = swiper
            setCurrentIndex(activeIndex)
            if (stories[activeIndex]) {
              markAsRead(stories[activeIndex].id)
            }
          }}
        >
          {stories.map((story, index) => (
            <SwiperSlide
              key={story.id}
              id="slide122"
              style={story.image ? { backgroundImage: `url(${story.image})` } : {}}
            >
              {story.link && (
                <div className="link">
                  <a href={`https://${story.link}`} target="_blank" rel="noopener noreferrer">
                    링크 이동
                  </a>
                  <span>{story.author.nickname}님이 첨부한 링크가 있어요!</span>
                </div>
              )}
              <div className="detail">
                <div
                  className="comment-section"
                  ref={currentIndex === index ? commentSectionRef : null}
                >
                  {currentIndex === index &&
                    storyComments?.map((storyComment: GET_Stories) => (
                      <div key={storyComment.id} className="comment">
                        <span className="author">
                          {storyComment.author.nickname} · {formatPostDate(storyComment.created_at)}
                        </span>
                        <p className="content">{storyComment.content}</p>
                      </div>
                    ))}
                </div>
                <span className="views">
                  <div className="view-icon-wrapper">
                    <ViewsIcon />
                  </div>
                  {story.views}
                </span>
              </div>
              <p>{story.content}</p>
              <InputSection>
                <input
                  placeholder="댓글 쓰기"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  onKeyDown={handleKeyPress}
                />
              </InputSection>
            </SwiperSlide>
          ))}
        </Swiper>
      </Body>
    </Contaniner>
  )
}

const Contaniner = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  background-color: #4a4646;
`

const Header = styled.div`
  z-index: 100;
  background-color: transparent;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: white;
    font-family: var(--font-saira);
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  button {
    all: unset;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Body = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  .swiper-wrapper {
    height: 100vh;
    width: 100vw;
  }

  .swiper-slide {
    box-shadow: inset 0 -100px 100px 0px rgba(0, 0, 0, 0.5);
    position: relative;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    padding: 100px 30px 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    & > p {
      width: 100%;
      text-align: start;
      box-sizing: border-box;
      margin: 0;
      word-break: keep-all;
      color: white;
      font-size: 26px;
      font-weight: 400;
    }

    .detail {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: end;

      .views {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ebebf54d;
        font-size: 11px;
        gap: 3px;

        .view-icon-wrapper {
          width: 11px;
          height: 11px;
          margin-bottom: 3px;

          svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .comment-section {
        box-sizing: border-box;
        overflow-y: scroll;
        max-height: 300px;
        min-height: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;

        .comment {
          span {
            font-size: 9px;
            font-weight: 600;
            color: #ffffff66;
          }

          p {
            margin: 0;
            font-size: 13px;
            font-weight: 400;
            color: white;
          }
        }
      }
    }

    .link {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);

      box-sizing: border-box;
      padding: 5px 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      & > a {
        color: white;
        font-size: 14px;
        font-weight: 400;
      }

      & > span {
        all: unset;
        text-decoration: none;
        color: white;
        font-size: 10px;
        font-weight: 400;
      }
    }
  }
`

const InputSection = styled.section`
  z-index: 100;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    box-sizing: border-box;
    height: 36px;
    width: 100%;
    padding: 0 15px;

    border-radius: 100px;
    border: 1px solid rgb(58, 58, 60);
    background-color: #000;
    font-size: 15px;
    font-weight: 400;
    color: white;
    outline: none;
  }
`
