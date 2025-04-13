'use client'

import { useMediaQuery } from '@mui/material'
import MobileChatPage from './mobile/MobileChat'
import DesktopChatPage from './desktop/DesktopChat'

function ChatPage() {
  const isMobile = useMediaQuery('(max-width: 1200px)')

  return isMobile ? <MobileChatPage /> : <DesktopChatPage />
}

export default ChatPage
