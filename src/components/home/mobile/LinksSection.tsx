'use client'

import Link from 'next/link'
import useCategoryStore from '@/store/useCategoryStore'
import { linksSectionStyle } from './MobileHome.css'

export default function LinksSection() {
  const { setCategory } = useCategoryStore()

  return (
    <div className={linksSectionStyle.container}>
      <h2 className={linksSectionStyle.title}>바로가기</h2>
      <div className={linksSectionStyle.links}>
        <Link
          onClick={() => setCategory('NOTICE')}
          href="/board"
          className={linksSectionStyle.link}
        >
          공지사항
        </Link>
        <Link
          href="https://www.sbs.com.au/language/korean/ko"
          className={linksSectionStyle.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          뉴스
        </Link>
        <Link
          onClick={() => setCategory('PROMOTION')}
          href="/board"
          className={linksSectionStyle.link}
        >
          홍보
        </Link>
        <Link href="/chat" className={linksSectionStyle.link}>
          채팅
        </Link>
        <Link
          onClick={() => setCategory('FREEBOARD')}
          href="/board"
          className={linksSectionStyle.link}
        >
          자유게시판
        </Link>
        <Link
          onClick={() => setCategory('MARKET')}
          href="/board"
          className={linksSectionStyle.link}
        >
          쿼카마켓
        </Link>
        <Link onClick={() => setCategory('JOB')} href="/board" className={linksSectionStyle.link}>
          구인구직
        </Link>
      </div>
    </div>
  )
}
