import { style } from '@vanilla-extract/css'

export const root_container = style({
  marginTop: '50px',
})

/** 채팅 영역 */
export const chatSectionStyle = {
  container: style({
    padding: '0px 20px',
    maxHeight: 'calc(3 * (23.5px + 5px) + 3px)',
    overflow: 'hidden',
  }),
  link: style({
    all: 'unset',
  }),
  list: style({
    all: 'unset',
  }),
  content: style({
    all: 'unset',
    display: 'inline-flex',
    margin: '0 5px 5px 0',
    borderRadius: '11px',
    backgroundColor: 'rgb(242, 242, 247)',
    padding: '3px 8px',
    fontSize: '11px',
    letterSpacing: '-0.34px',
  }),
}
