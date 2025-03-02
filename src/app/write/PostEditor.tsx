/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '@/libs/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCategoryStore from '@/store/useCategoryStore'
import formats from './default'
import useUser from '../../hooks/useUser'
import { boardLinks } from '../NewComponent/NewHeader'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

type NewPostType = {
  user: any
  title: string
  content: string
  category: string
  thumbnail: string | undefined
}

export type Category = {
  id: number
  label: string
  name: string
  subCategories?: Category[]
}

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp({ forwardedRef, ...props }: { forwardedRef: any; [key: string]: any }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)

function PostEditor() {
  const queryClient = useQueryClient()
  const { category } = useCategoryStore()
  const { user } = useUser()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()
  const [isPending, setIsPending] = useState(false)

  const { mutate: writePost } = useMutation({
    mutationFn: async (newPost: NewPostType) => api.post('/posts', newPost),
    onSuccess: ({ data: post }) => {
      queryClient.invalidateQueries({
        queryKey: ['posts', category],
      })
      router.push(`post?postId=${post.id}`)
    },
  })

  const onDrop = (acceptedFiles: File[]) => {
    const file: File = acceptedFiles[0]

    const reader: FileReader = new FileReader()
    reader.onloadend = () => {
      const base64String: string | ArrayBuffer | null = reader.result
      if (typeof base64String === 'string') {
        const range = quillRef.current?.getEditor().getSelection()
        if (range) {
          quillRef.current?.getEditor().insertEmbed(range.index, 'image', base64String)
        }
      }
    }

    reader.readAsDataURL(file)
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }], // 텍스트 크기 옵션 추가
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }],
        ],
      },

      imageDrop: onDrop,
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [],
  )
  const onClickWrite = async () => {
    if (!title || !content) {
      alert(title ? '본문은 필수 입력입니다.' : '제목은 필수 입력입니다.')
      return
    }

    setIsPending(true) // 게시글 작성 중
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const imgElements = tempDiv.querySelectorAll('img')

    await Promise.all(
      Array.from(imgElements).map(async (img) => {
        if (img.src.startsWith('data:image')) {
          const formData = new FormData()
          const base64Data = img.src.split(',')[1]
          const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then((res) => res.blob())
          formData.append('file', blob, 'image.jpg')

          try {
            const {
              data: { imageURL },
            } = await api.post('/image', formData)

            img.src = imageURL
          } catch (error) {
            console.error('이미지 업로드 실패:', error)
          }
        }
      }),
    )

    const updatedContent = tempDiv.innerHTML

    writePost({
      user,
      title,
      content: updatedContent,
      category,
      thumbnail: imgElements.length > 0 ? imgElements[0].src : undefined,
    })
  }

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <QuillContainer>
        <h1>{boardLinks.find((link) => link.category === category)?.label} 글쓰기</h1>
        <input
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          disabled={isPending}
        />
        <DynamicReactQuill
          forwardedRef={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleChange}
          readOnly={isPending}
        />
        <WriteButton onClick={onClickWrite} $isPending={isPending}>
          {isPending ? '게시글 작성 중' : '완료'}
        </WriteButton>
      </QuillContainer>
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const QuillContainer = styled.div`
  width: 700px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-top: 50px;

  h1 {
    margin: 0 0 20px 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  input {
    margin-bottom: 20px;
    font-weight: 400px;
    font-size: 20px;
    padding: 10px 15px;
  }

  .ql-editor {
    height: 430px;
    overflow-y: scroll;
  }
`

const WriteButton = styled.button<{ $isPending: boolean }>`
  cursor: pointer;
  border: none;
  margin-top: 15px;
  background-color: #007aff;
  background-color: ${(props) => (props.$isPending ? '#c4c4c4' : '#007aff')};
  font-size: 17px;
  font-weight: 700;
  color: white;
  border-radius: 6px;
  width: 180px;
  height: 44px;
`
