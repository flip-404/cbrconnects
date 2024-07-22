'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import parse from 'html-react-parser'
import formatDate from '@/utils/formatData'
import ViewIcon from '@/assets/view_icon.svg'
import LikeIcon_ from '@/assets/like_icon.svg'
import CommentIcon from '@/assets/comment_icon.svg'
import findLabelById from '@/utils/findLabelById'

type Post = {
  mainCategory: string
  subCategory: string

  id: number
  title: string
  content: string
  createdAt: Date
  viewCount: number
  author: {
    nickname: string
  }
  comments: {
    id: number
    content: string
  }[]
  likes: {
    id: number
  }[]
}

function Search() {
  const router = useRouter()
  const params = useSearchParams()
  const searchTerm = params.get('searchTerm')
  const searchType = params.get('searchType')
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }

  useEffect(() => {
    console.log(posts)
  }, [posts])

  useEffect(() => {
    if (searchTerm && searchType) {
      fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm,
          searchType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data)
          setIsLoading(false)
        })
    }
  }, [searchTerm, searchType])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <SearchResult>
        <SearchTerm>
          <strong>{`'${searchTerm}'`}</strong>의 검색결과{' '}
          <span>총 {posts.length}개</span>
        </SearchTerm>
        {posts.length > 0 ? (
          <SearchList>
            {posts.map((post) => (
              <ListItem
                key={post.id}
                onClick={() => {
                  handleMoveToPost(post.id)
                }}
              >
                <Title>{post.title}</Title>
                <Content>{parse(post.content)}</Content>
                <CategoryWrapper>
                  <CategoryChip $color="#c9932e">
                    {findLabelById(post.mainCategory)}
                  </CategoryChip>
                  {post.subCategory && (
                    <CategoryChip $color="#46ae73">
                      {findLabelById(post.subCategory)}
                    </CategoryChip>
                  )}
                </CategoryWrapper>
                <MetaInfo>
                  <span>{post.author.nickname}</span>·
                  <span>{formatDate(post.createdAt)}</span>·
                  <span>
                    <ViewIcon width={16} height={16} /> {post.viewCount}
                  </span>
                  ·
                  <span>
                    <LikeIcon width={16} height={16} />
                    {post.likes.length}
                  </span>
                  ·
                  <span>
                    <CommentIcon width={16} height={16} />
                    {post.comments.length}
                  </span>
                </MetaInfo>

                <CategoryWrapper />
              </ListItem>
            ))}
          </SearchList>
        ) : (
          <p>No results found</p>
        )}
      </SearchResult>
    </Container>
  )
}

export default Search

const Container = styled.div`
  padding: 40px 0px;
  background-color: #eff0f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 60vh;
  gap: 40px;
`

const SearchResult = styled.div`
  width: 70vw;
  background-color: white;
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
`

const SearchTerm = styled.h2`
  font-size: 28px;
  font-weight: 400;

  span {
    color: rgb(90, 97, 107);
    font-size: 18px;
  }
`

const SearchList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0px;
  padding: 0px;
`

const ListItem = styled.li`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #eff0f3;
  border-radius: 25px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`
const Content = styled.div`
  p {
    margin: 0px;
  }
`

const MetaInfo = styled.div`
  display: flex;
  gap: 5px;
  color: #868e96;
  font-size: 14px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
`

const CategoryWrapper = styled.div`
  display: flex;
  gap: 6px;
`

const CategoryChip = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color};
  border: ${(props) => `1px solid ${props.$color}`};

  border-radius: 10px;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: 700;
`

const LikeIcon = styled(LikeIcon_)``
