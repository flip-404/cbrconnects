import styled from 'styled-components'

function EventContainer() {
  const truncateText = (text: string) => {
    return text.length > 18 ? `${text.substring(0, 18)}...` : text
  }

  return (
    <Container>
      <EventBox>
        <CurrentMonth>2024. 08</CurrentMonth>
        <UL>
          <ListItem>
            03. 09 <span>TUE</span>{' '}
            {truncateText(
              '이벤트 내용 텍스트트트 이벤트 내용 텍스트트트이벤트 내용 텍스트트트',
            )}
          </ListItem>
          <ListItem>
            03. 09 <span>TUE</span>{' '}
            {truncateText(
              '이벤트 내용 텍스트트트 이벤트 내용 텍스트트트이벤트 내용 텍스트트트',
            )}
          </ListItem>
        </UL>
      </EventBox>
      <PS>업체 행사 무료 추가 가능합니다.</PS>
    </Container>
  )
}

export default EventContainer

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const EventBox = styled.div`
  border-radius: 16px;
  border: 1px solid #e0e3e8;
  display: flex;
  flex-direction: column;
  padding: 15px 16px;
`

const CurrentMonth = styled.div`
  padding: 4px 6px;
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  border-bottom: 0.8px solid #e0e3e8;
`

const UL = styled.ul`
  padding-left: 22px;
`

const ListItem = styled.li`
  &::marker {
    color: #436af5;
    font-size: 20px;
  }

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: #3c4653;

  span {
    font-weight: 500;
    color: #282e38;
    &::after {
      content: '|';
      margin: 0 5px;
      color: #a2acb9;
    }
  }
`

const PS = styled.span`
  padding-left: 16px;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: #a2acb9;
`
