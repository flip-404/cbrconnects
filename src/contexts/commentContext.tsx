import { createContext, useContext, useState } from 'react'

interface CommentContextType {
  selectedReplyComment: number | null
  selectedEditComment: number | null
  selectReplyComment: (commentId: number | null) => void
  selectEditComment: (commentId: number | null) => void
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedReplyComment, setSelectedReplyComment] = useState<
    number | null
  >(null)
  const [selectedEditComment, setSelectedEditComment] = useState<number | null>(
    null,
  )

  const selectReplyComment = (commentId: number | null) => {
    setSelectedReplyComment(commentId)
  }

  const selectEditComment = (commentId: number | null) => {
    setSelectedEditComment(commentId)
  }

  return (
    <CommentContext.Provider
      value={{
        selectedReplyComment,
        selectedEditComment,
        selectReplyComment,
        selectEditComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export const useComment = () => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider')
  }
  return context
}
