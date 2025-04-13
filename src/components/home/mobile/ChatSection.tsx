import { chat as Chat } from '@prisma/client'
import Link from 'next/link'
import { chatSectionStyle } from './MobileHome.css'
import { headers } from 'next/headers'

export default async function ChatSection() {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/chat`)
  const data = await res.json()
  const chats = data?.chats || []

  return (
    <div className={chatSectionStyle.container}>
      <Link href="/chat" className={chatSectionStyle.link}>
        <ul className={chatSectionStyle.list}>
          {chats.map((chat: Chat) => (
            <li key={chat.id} className={chatSectionStyle.content}>
              {chat.content}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}
