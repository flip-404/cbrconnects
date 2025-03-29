import { style } from '@vanilla-extract/css'

export const root_container = style({
  marginTop: '50px',
})

/** 스토리 영역 */
export const storySectionStyle = {
  container: style({}),
  link: style({}),
  list: style({}),
  content: style({}),
}

/** 로그인 버튼 */
export const loginButton = style({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 20px',
  margin: '10px 20px 15px 20px',
  borderRadius: '4px',

  color: 'rgb(0, 122, 255)',
  fontSize: '15px',
  fontWeight: '600',
  backgroundColor: 'rgb(242, 242, 247)',
})

/** 채팅 영역 */
export const chatSectionStyle = {
  container: style({
    padding: '0 20px',
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

/** 뉴스 영역 */
export const newsSectionStyle = {
  container: style({
    overflow: 'scroll',
    padding: '0 20px',
    display: 'flex',
    listStyleType: 'none',
  }),
  news: style({
    all: 'unset',
    boxSizing: 'border-box',
    marginRight: '6px',
    width: '160px',
    height: '160px',
    padding: '12px 10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexShrink: 0,
    borderRadius: '16px',
  }),
  link: style({
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    fontSize: '15px',
    fontWeight: '600',
    color: 'white',
    textShadow: '0 0 10px rgba(0, 0, 0, 1)',
  }),
}

/** recent 영역 */
export const recentSectionStyle = {
  container: style({
    all: 'unset',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    overflow: 'scroll',
  }),
  listitem: style({
    all: 'unset',
    height: '110px',
    width: '160px',
    flexShrink: 0,
  }),
  post: style({
    backgroundColor: '#f2f2f7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    height: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    textDecoration: 'none',
    borderRadius: '16px',
  }),
  category: style({
    color: '#3c3c4399',
    fontSize: '11px',
    fontWeight: '600',
  }),
  title: style({
    all: 'unset',
    color: 'black',
    fontSize: '15px',
    fontWeight: '600',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  }),
  detail: style({ color: '#3c3c4399', fontSize: '11px' }),
  links: style({
    all: 'unset',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 2fr)',
    gap: '4px',
    height: '110px',
    width: '160px',
    flexShrink: 0,
  }),
  link: style({
    all: 'unset',
    backgroundColor: '#f2f2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600',
    color: '#3c3c4399',
  }),
}

/** promotion 영역 */
export const promotionSectionStyle = {
  container: style({}),
  link: style({}),
  list: style({}),
  content: style({}),
}

/** links 영역 */
export const linksSectionStyle = {
  container: style({}),
  link: style({}),
  list: style({}),
  content: style({}),
}
