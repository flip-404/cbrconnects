import { style } from '@vanilla-extract/css'

/** links 영역 */
export const SendMessagePageStyle = {
  container: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: style({
    width: '700px',
    justifyContent: 'start',
    margin: '20px 0 10px 0',
    fontSize: '28px',
    fontWeight: 800,
  }),
  form: style({
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
  }),
  content: style({
    all: 'unset',
    padding: '12px',
    borderRadius: '5.17px',
    border: '0.65px solid #bfbfbf',
    minHeight: '200px',
    ':focus': {
      borderColor: '#3399ff',
      boxShadow: '0 0 0 3px #b6daff',
    },
  }),
  sendButton: style({
    all: 'unset',
    margin: '20px 0 0 0',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '5.17px',
    display: 'inline-block', // 기존 inline-flex에서 변경
    width: 'fit-content', // 버튼 크기를 텍스트 내용에 맞게 조정
    backgroundColor: '#007aff',
  }),
}
