'use client'

import useUser from '@/hooks/useUser'
import { SendMessagePageStyle } from './page.css'
import { useState } from 'react'
import api from '@/libs/axiosInstance'
import { useRouter } from 'next/navigation'

type SendFormProps = {
  reveiverId: string
}

function SendForm({ reveiverId }: SendFormProps) {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageData = {
      content,
      senderId: user?.id,
      receiverId: reveiverId,
    }
    const response = await api.post('/messages', messageData)
    if (response.status === 201) {
      alert('쪽지 전송 완료')
      setContent('')
      router.back()
    } else {
      alert(`쪽지 전송 실패 \n${response.data.message}`)
    }
  }

  return (
    <form className={SendMessagePageStyle.form} onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력해주세요."
        className={SendMessagePageStyle.content}
      ></textarea>
      <input
        type="submit"
        className={SendMessagePageStyle.sendButton}
        value={'쪽지 보내기'}
      ></input>
    </form>
  )
}

export default SendForm
