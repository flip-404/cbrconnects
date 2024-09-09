import styled from 'styled-components'
import PhaseLineIcon from '@/assets/phaseLine_icon.svg'

export default function Phase({ phase }: { phase: number }) {
  return (
    <Container>
      <PhaseWrapper>
        <Sequence $active>1</Sequence>
        <Label $active>필수항목</Label>
      </PhaseWrapper>
      <PhaseLineIcon />
      <PhaseWrapper>
        <Sequence $active={phase === 1}>2</Sequence>
        <Label $active={phase === 1}>가입완료</Label>
      </PhaseWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 0px;
  height: 100%;
  display: flex;

  svg {
    margin-top: 11px;
  }
`

const PhaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 8px;
`

const Sequence = styled.div<{ $active: boolean }>`
  background: ${(props) => (props.$active ? '#1e42ff' : '#D9D9D9')};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21.33px;
  height: 21.33px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  color: white;
`

const Label = styled.label<{ $active: boolean }>`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  color: ${(props) => (props.$active ? '#000000' : '#D9D9D9')};
`
