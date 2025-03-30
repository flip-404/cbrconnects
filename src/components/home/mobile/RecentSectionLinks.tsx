'use client'

import Link from 'next/link'
import useCategoryStore from '@/store/useCategoryStore'
import { recentSectionStyle } from './MobileHome.css'

export default function RecentSectionLinks() {
  const { setCategory } = useCategoryStore()

  return (
    <li className={recentSectionStyle.links}>
      <Link
        href="/board"
        onClick={() => setCategory('FREEBOARD')}
        className={recentSectionStyle.link}
        style={{
          borderRadius: '16px 5px 5px 5px',
        }}
      >
        자유
      </Link>
      <Link
        href="/board"
        onClick={() => setCategory('MARKET')}
        className={recentSectionStyle.link}
        style={{
          borderRadius: '5px 16px 5px 5px',
        }}
      >
        마켓
      </Link>
      <Link
        href="/board"
        onClick={() => setCategory('JOB')}
        className={recentSectionStyle.link}
        style={{
          borderRadius: '5px 5px 5px 16px',
        }}
      >
        구직
      </Link>
      <Link
        href="/board"
        onClick={() => setCategory('NOTICE')}
        className={recentSectionStyle.link}
        style={{
          borderRadius: '5px 5px 16px 5px',
        }}
      >
        공지
      </Link>
    </li>
  )
}
