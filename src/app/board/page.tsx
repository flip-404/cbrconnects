/* eslint-disable no-nested-ternary */

'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { boardLinks } from '@/components/Desktop/DesktopHeader'
import api from '@/libs/axiosInstance'
import Link from 'next/link'
import { GET_Posts } from '@/types/newIndex'
import { useMediaQuery } from '@mui/material'
import { formatPostDate } from '@/utils/formatDate'
import useCategoryStore from '@/store/useCategoryStore'
import LikeIcon from '@/assets/like.svg'
import SkeletonPosts from './SkeletonPosts'
import BoardControls from './BoardControls'

const limit = 16

// todo: like mobile overflow 조정 ex) like: 3
function Board() {
  const isMobile = useMediaQuery('(max-width: 1200px)')
  const queryClient = useQueryClient()
  const { category, setCategory } = useCategoryStore()
  const [searchFilter, setSearchFilter] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['posts', category, page, limit, searchFilter, searchKeyword],
    queryFn: ({ queryKey }) =>
      api.get(
        `/posts?category=${queryKey[1]}&page=${page}&limit=${limit}&search_filter=${searchFilter}&search_keyword=${searchKeyword}`,
      ),
  })
  const { data: totalPostData } = useQuery({
    queryKey: ['posts', category, searchFilter, searchKeyword],
    queryFn: ({ queryKey }) =>
      api.get(
        `/posts/count?category=${queryKey[1]}&search_filter=${searchFilter}&search_keyword=${searchKeyword}`,
      ),
  })

  const posts = data?.data.posts || []

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }

  const updateSearchOptions = (
    filter: 'search_author' | 'search_title' | 'search_content' | 'search_full_text',
    keyword: string,
  ) => {
    if (!filter || !keyword) return

    setSearchFilter(filter)
    setSearchKeyword(keyword)
    queryClient.invalidateQueries({
      queryKey: ['posts', category],
    })
  }

  const resetSearchOptions = () => {
    setSearchFilter('')
    setSearchKeyword('')
  }

  return (
    <Container>
      <Tabs>
        {boardLinks.map((item) => {
          if (isMobile && item.category !== category) return null
          return (
            <Tab
              key={item.category}
              onClick={() => {
                setSearchFilter('')
                setSearchKeyword('')
                setCategory(item.category)
              }}
              $active={category === item.category}
            >
              {item.label}
            </Tab>
          )
        })}
        {isMobile && <Link href={`/write?category=${category}`}>새 글 쓰기</Link>}
      </Tabs>
      <Posts>
        {isLoading ? (
          <SkeletonPosts />
        ) : posts.length === 0 ? (
          '게시물이 없습니다.'
        ) : (
          posts.map((post: GET_Posts) => (
            <Post key={post.id}>
              {!isMobile ? (
                <>
                  <div>
                    <span className="comment-count">{post.comment_count}</span>
                    <div className="post-title">
                      <Link href={`/post?postId=${post.id}`}>{post.title}</Link>
                    </div>
                    <p className="post-author">
                      {post.author_name}
                      <span>{formatPostDate(post.created_at)}</span>
                    </p>
                  </div>
                  <span className="post-likes">
                    {post.likes.map((like) => (
                      <LikeIcon key={like.id} />
                    ))}
                  </span>
                </>
              ) : (
                <>
                  <div>
                    <span className="comment-count">{post.comment_count}</span>
                    <div className="right-section">
                      <div className="post-title">
                        <Link href={`/post?postId=${post.id}`}>{post.title}</Link>
                      </div>
                      <div className="m-post-detail">
                        {post.author_name} · {formatPostDate(post.created_at)}
                        <span>
                          <span className="post-likes">
                            {post.likes.map((like) => (
                              <LikeIcon key={like.id} />
                            ))}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Post>
          ))
        )}
      </Posts>
      <BoardControls
        category={category}
        page={page}
        onPageChange={onPageChange}
        totalPosts={totalPostData?.data.totalPosts || 0}
        limit={limit}
        updateSearchOptions={updateSearchOptions}
        resetSearchOptions={resetSearchOptions}
      />
    </Container>
  )
}

export default Board

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    margin-top: 50px;
  }
`

const Tabs = styled.div`
  margin-top: 40px;
  width: 1300px;
  display: flex;
  gap: 25px;
  color: #3c3c434d;

  @media (max-width: 1200px) {
    margin: 25px 0 0 0;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    a {
      display: flex;
      align-items: center;
      border-radius: 4px;
      text-decoration: none;
      background-color: #007aff;
      padding: 4px 15px;
      color: white;
      font-size: 15px;
      font-weight: 600;
    }
  }
`

const Tab = styled.h2<{ $active: boolean }>`
  margin: 0;
  font-size: 38px;
  font-weight: 800;
  color: ${(props) => (props.$active ? '#000' : '#3c3c434d')};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3c3c4399;
  }

  @media (max-width: 1200px) {
    font-size: 24px;
    font-weight: 800;
  }
`

const Posts = styled.ul`
  all: unset;
  margin-top: 40px;
  width: 1300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1200px) {
    margin-top: 20px;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    gap: 0;
  }
`

const Post = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;

  & > div {
    display: flex;
    align-items: center;

    .comment-count {
      width: 50px;
      font-size: 17px;
      font-weight: 400;
    }

    .post-title {
      margin-right: 25px;

      a {
        color: black;
        text-decoration: none;
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .post-author {
      margin: 0;
      font-weight: 600;
      height: 22.5px;

      span {
        margin-left: 5px;
        font-size: 11px;
        font-weight: 400;
        color: #3c3c434d;
      }
    }
  }

  .post-likes {
    position: absolute;
    left: 50px;
    bottom: -15px;

    svg {
      width: 13px;
      height: 13px;
    }
  }

  @media (max-width: 1200px) {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    width: 100%;

    border-top: 0.5px solid #3c3c434d;
    &:last-child {
      border-bottom: 0.5px solid #3c3c434d;
    }

    & > div {
      display: flex;
      flex-direction: row;
      flex-shrink: 0;

      .comment-count {
        box-sizing: border-box;
        width: 40px;
        margin-top: 3px;
        flex: 1;
        height: 100%;
        flex-shrink: 0;
        font-size: 17px;
        font-weight: 400;
      }
      .right-section {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 250px;
        width: 300px;

        .post-title {
          flex: 1;
          width: 100%;

          a {
            display: inline-block;
            max-width: 100%;
            font-size: 17px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .m-post-detail {
          display: flex;
          margin: 0;
          font-size: 13px;
          color: #3c3c434d;

          span {
            position: relative;
            display: flex;
            align-items: center;

            .post-likes {
              position: absolute;
              display: flex;
              left: 5px;
              top: 50%;
              transform: translateY(-50%);

              svg {
                width: 13px;
                height: 13px;
              }
            }
          }
        }
      }
    }
  }
`
