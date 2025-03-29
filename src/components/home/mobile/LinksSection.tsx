'use client'

import Link from 'next/link'
import { linksSectionStyle } from './MobileHome.css'
import useCategoryStore from '@/store/useCategoryStore'

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
        <Link href="/about" className={linksSectionStyle.link}>
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
        <Link onClick={() => setCategory('JOB')} href="/about" className={linksSectionStyle.link}>
          구인구직
        </Link>
      </div>
    </div>
  )
}
