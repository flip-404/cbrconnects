import { chat as Chat } from '@prisma/client'
import Link from 'next/link'
import { chatSectionStyle } from './MobileHome.css'

export default async function ChatSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`)
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
