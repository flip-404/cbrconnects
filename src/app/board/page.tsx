'use client'

import { useState } from 'react'
import styled from 'styled-components'
import LikeIcon from '@/assets/like.svg'
import BoardControls from './BoardControls'
import { useSearchParams } from 'next/navigation'
import { boardLinks } from '../NewComponent/NewHeader'

const posts = [
  {
    comments: 1,
    title: '한번 알아보았습니다.',
    time: '3시간 전',
    author: 'kimano1272',
    likes: 12,
  },
  {
    comments: 3,
    title: '이것저것 느낀점(장문)',
    time: '10시간 전',
    author: 'LeftWing',
    likes: 6,
  },
  {
    comments: 6,
    title: '[UCL 16강 P.O 2차전] 레알 마드리드 vs 맨체스터 시티 후토크',
    time: '11시간 전',
    author: 'pabloooo',
    likes: 15,
  },
  {
    comments: 15,
    title: '챔스 녹아웃 플레이오프 맨시티전 2차전 단상',
    time: '12시간 전',
    author: '마요',
    likes: 7,
  },
  {
    comments: 7,
    title: '레알은 위기가 한번씩 와야되나봐요',
    time: '13시간 전',
    author: '하메스 로드리게스',
    likes: 10,
  },
  {
    comments: 10,
    title: '호드리구',
    time: '13시간 전',
    author: '안뱅바요르~',
    likes: 9,
  },
  {
    comments: 9,
    title: '이건좀..',
    time: '15시간 전',
    author: '챔스3연패',
    likes: 9,
  },
  {
    comments: 9,
    title: '경기는 올시즌 최고였는데 카마빙가 수비가 참....',
    time: '15시간 전',
    author: '축신왈왈이',
    likes: 8,
  },
  {
    comments: 8,
    title:
      '[엘에스파뇰]무누에라가 설립한 회사는 고위급 라리가 및 VAR 관계자의 파트너',
    time: '이틀 전',
    author: '페레스의 로망',
    likes: 10,
  },
  {
    comments: 10,
    title: '심판 콜에 대한 생각.',
    time: '3일 전',
    author: '마요',
    likes: 4,
  },
  {
    comments: 4,
    title: '꼰대 카르텔이 되어버린 라리가',
    time: '4일 전',
    author: 'Becks in Madrid',
    likes: 2,
  },
  {
    comments: 2,
    title: '그냥 인류애가 떨어지는 경기',
    time: '4일 전',
    author: '카카♥',
    likes: 0,
  },
  {
    comments: 0,
    title: '심판이 망친 경기..',
    time: '4일 전',
    author: '복정동비닐신',
    likes: 5,
  },
  {
    comments: 5,
    title: '심핀 진짜 역겹네요',
    time: '4일 전',
    author: '백의의레알',
    likes: 28,
  },
  {
    comments: 28,
    title: '팀내 발롱 포디움 후보 5인의 올시즌 주요 스탯',
    time: '7일 전',
    author: '마요',
    likes: 14,
  },
  {
    comments: 14,
    title: '2차전 일정 및 남은 시즌 감상',
    time: '7일 전',
    author: '한량',
    likes: 0,
  },
]

function Board() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [tab, setTab] = useState(category)

  return (
    <Container>
      <Tabs>
        {boardLinks.map((item) => (
          <Tab
            key={item.category}
            onClick={() => setTab(item.category)}
            $active={tab === item.category}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>
      <Posts>
        {posts.map((post) => (
          <Post key={post.title}>
            <div>
              <span>{post.comments}</span>
              <div>
                <a>{post.title}</a>
              </div>
              <p>
                {post.author}
                <span>{post.time}</span>
              </p>
            </div>
            <span>
              {Array.from({ length: post.likes }).map((_, index) => (
                <LikeIcon key={index} />
              ))}
            </span>
          </Post>
        ))}
      </Posts>
      <BoardControls category={category}></BoardControls>
    </Container>
  )
}

const Post = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;
  position: relative;

  & > div {
    display: flex;
    align-items: center;

    & > span {
      width: 50px;
      font-size: 17px;
      font-weight: 400;
    }
    & > div {
      margin-right: 25px;

      a {
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    & > p {
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

  & > span {
    position: absolute;
    font-size: 13px;
    left: 50px;
    bottom: -15px;

    svg {
      width: 13px;
      height: 13px;
    }
  }
`

export default Board

const Posts = styled.ul`
  all: unset;
  margin-top: 40px;
  width: 1300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Tabs = styled.div`
  margin-top: 40px;
  width: 1300px;
  display: flex;
  gap: 25px;
  color: 3c3c434d;
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
`
