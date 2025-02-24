'use client'

import styled from 'styled-components'
import RefreshIcon from '@/assets/refresh.svg'
import ArrowBackIcon from '@/assets/arrow_back.svg'
import ArrowForwardIcon from '@/assets/arrow_forward.svg'
import EmptyIcon from '@/assets/empty_profile.svg'
import Link from 'next/link'

const chats = [
  {
    time: '16:42',
    nickname: '공효진',
    content:
      '과정이 우당탕하더라도 결과는 내주고 있죠. 그 결과 내주는 능력이 너무 저평가 받고 있다 생각.',
  },
  {
    time: '16:41',
    nickname: '공효진',
    content: '결과적으로 라센쇼는 자리잡았고 비음벨호는 동선정리 되가고',
  },
  {
    time: '16:38',
    nickname: '공효진',
    content:
      '안감독이 유망주 기용 적극적으로 하고, 2122시즌쯤엔 모들 이미 대체 된 상태로 챔스우승 못했다는 가정이면 지금보다 비판 덜 받았을까요? 안첼로티니나 모들이나 공과 전부 따지면 공이 확연히 크다봐서 마무리는 좋게갔으면 하네요',
  },
  {
    time: '16:35',
    nickname: '아자차타',
    content: '바스케스조차 못 놓는게 신기하죠.',
  },
  {
    time: '16:34',
    nickname: '아자차타',
    content:
      '꼰대전형으로 모들이 남는것도 팀문화로 봤을때는 나쁘지않다고 보는데',
  },
  {
    time: '16:34',
    nickname: 'Iker_Casillas',
    content:
      '올시즌 천재지변급 사고 아니었으면 라센시오도 걔가 레알급이었으면 알라바 밀어냈겠지 이런 소리 들었겠죠',
  },
  {
    time: '16:33',
    nickname: '하는님',
    content: '라모스처럼 회장 눈밖에 나지 않는 한...',
  },
  {
    time: '16:32',
    nickname: '하는님',
    content:
      '뭐가 문제인지는 대다수 팬들이 아는 상황인데 당사자인 모드리치나 안첼로티는 나갈 생각이 없으니 난감하죠. 둘 다 팀에 기여한 게 많아서 무작정 쫓아내기도 그렇고...',
  },
  { time: '16:32', nickname: '떼오', content: '차이가 심해도 너무 심하죠' },
  {
    time: '16:32',
    nickname: 'Iker_Casillas',
    content: '유망주랑 노망주 대하는게 너무 달라서..',
  },
  {
    time: '16:32',
    nickname: 'Iker_Casillas',
    content:
      '레알에서 뛸만한 싹인지 아닌지 최소한의 데이터는 확보하고 결론을 내야하는데',
  },
  {
    time: '16:31',
    nickname: 'San Iker',
    content:
      '경험적인 약점은 당연히 있겠죠? 근데 경기장 위에서 보여주고 있는 모습은 그게 아닌데요.',
  },
  {
    time: '16:30',
    nickname: 'San Iker',
    content:
      '리버풀 상대로 홀로 고군분투했고 맨시티 상대로 무쌍을 찍어도 안첼로티는 라센시오를 완전히 신뢰하지 않는다는 걸 인터뷰로 얘기했죠. 아직도 약점이 많대요. 대체 어디가요?',
  },
  {
    time: '16:30',
    nickname: '떼오',
    content:
      '감독이 유스팽하고 재능있는 선수 써먹질 않으니 기회가 없잖아요 당장 라센시오만 해도 매경기 증명하는데 우선순위도 아니고요',
  },
  {
    time: '16:29',
    nickname: 'San Iker',
    content:
      '알라바 선발 출장? 원래 같으면 말이 안된다는 거 마드리드 경기 챙겨보는 팬들이라면 알테지만 감독이 안첼로티니까 이거 가능한 소리다 라는 생각이 드는 것도 마드리드 팬이면 자연스럽죠. 참.. 어이가 없습니다.',
  },
  {
    time: '16:28',
    nickname: 'Iker_Casillas',
    content: '감독이 알잘딱하면 문제될 게 아닌데..',
  },
  {
    time: '16:28',
    nickname: 'Iker_Casillas',
    content:
      '애초에 40된 모드리치가 레알급이 아닌데 필요 이상 쓰이고 있는게 문제니까요',
  },
  {
    time: '16:27',
    nickname: 'San Iker',
    content:
      '그 세바요스도 모드리치 때문에 출장시간 많이 밀렸다가 이제서야 중용 받는 것도 팩트죠',
  },
  {
    time: '16:27',
    nickname: 'Iker_Casillas',
    content: '당장 라센시오 케이스만 봐도 그렇게 볼 문제는 아니죠',
  },
  {
    time: '16:27',
    nickname: 'San Iker',
    content:
      '안첼로티가 노장 의존도가 얼마나 심하면 언론에서 알라바가 마드리드 더비 챔스 경기에서 선발로 뛸 거다 이런 소리가 나오겠습니까. 아센시오가 뻔히 잘해주고 있는 현 상황에서요.',
  },
]

function ChatPage() {
  return (
    <Container>
      <h3>CHAT</h3>
      <ChatControls>
        <input />
        <RefreshIcon />
        <ArrowBackIcon />
        <ArrowForwardIcon />
      </ChatControls>
      <Chats>
        {chats.map((chat, index) => (
          <Chat>
            <span>{chat.time}</span>
            <Link href="profile">
              <EmptyIcon /> {chat.nickname}
            </Link>
            <p>{chat.content}</p>
          </Chat>
        ))}
      </Chats>
    </Container>
  )
}

export default ChatPage

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0px;
    width: 1300px;
    font-size: 38px;
    font-weight: 800;
  }
`

const ChatControls = styled.div`
  width: 1300px;
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    padding-bottom: 5px;
    border: none;
    border-bottom: 0.5px solid rgba(60, 60, 67, 0.18);
    width: 650px;
    font-size: 28px;
    font-weight: 700;

    &:focus {
      outline: none;
    }
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const Chats = styled.ul`
  width: 1300px;
`

const Chat = styled.li`
  all: unset;
  display: flex;
  align-items: center;
  gap: 20px;
  letter-spacing: 1px;
  margin-bottom: 10px;

  span {
    color: #3c3c434d;
    font-size: 15px;
    font-weight: 600;
  }

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
    text-decoration: none;
    color: black;
    font-size: 15px;
    font-weight: 600;

    &:hover {
      opacity: 0.5;
    }

    svg {
      border-radius: 4px;
      background-color: #f0f0f0;
      width: 24px;
      height: 24px;
    }
  }

  p {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
  }
`
