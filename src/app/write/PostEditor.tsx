/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useRouter, useSearchParams } from 'next/navigation'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import ReactQuill, { Quill } from 'react-quill'
import ImageLoadingIcon from '@/assets/ImageLoading.gif'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { PostWithRelations } from '@/types'
import NotificationModal from '../_components/NotificationModal'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

const DynamicReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp({
      forwardedRef,
      ...props
    }: {
      forwardedRef: any
      [key: string]: any
    }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)

function PostEditor() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef<ReactQuill>()
  const [thumbnail, setThumbnail] = useState(null)

  const searchParams = useSearchParams()

  const mainCategory = searchParams.get('mainCategory')
  const subCategory = searchParams.get('subCategory')
  const isEditMode = searchParams.get('isEditMode') === 'true'
  const postId = searchParams.get('postId')

  const { data: post } = useSWR<PostWithRelations>(
    isEditMode ? `/api/posts?postId=${postId}` : null,
    fetcher,
  )

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.id === mainCategory,
  )!

  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.id === subCategory,
  )!

  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file: any = input.files ? input.files[0] : null
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      const quillObj = quillRef.current?.getEditor()
      if (quillObj) {
        const range = quillObj.getSelection()!

        quillObj.insertEmbed(range.index, 'image', '/ImageLoading.gif')

        const { imageURL } = await fetch(`/api/image`, {
          method: 'POST',
          body: formData,
        }).then((res) => {
          quillObj.deleteText(range.index, 1)
          return res.json()
        })
        quillObj?.insertEmbed(range.index, 'image', `${imageURL}`)
        quillObj.setSelection(range.index + 1, 1)
        if (!thumbnail) {
          setThumbnail(imageURL)
        }
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }], // 텍스트 크기 옵션 추가
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageDrop: imageHandler,
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [],
  )

  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 100) {
      alert('제목은 100자 이하로 작성해주세요.')
    } else {
      setTitle(e.target.value)
    }
  }

  const handleWritePost = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.back()
    }, 2000)

    const method = isEditMode ? 'PUT' : 'POST'

    await fetch('/api/posts', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: post?.id,
        title,
        content,
        userId: session?.user.id,
        mainCategory: firstNavItem.id,
        ...(secondNavItem && { subCategory: secondNavItem.id }),
        thumbnail,
        isNotice: false,
      }),
    })
  }

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      {isLoading && (
        <NotificationModal label="게시글을 작성 중 입니다. 잠시만 기다려주세요" />
      )}
      <Header>
        <CategoryWrapper>
          {firstNavItem.label} - {secondNavItem?.label}
        </CategoryWrapper>
        <WriteButton onClick={handleWritePost}>글 작성</WriteButton>
      </Header>
      <TitleWrapper>
        <TitleLabel htmlFor="titleLabelInput">제목</TitleLabel>
        <TitleInput
          id="titleInput"
          placeholder="게시글 제목을 입력해주세요"
          onChange={handleTitleChange} // 변경된 부분
          value={title}
        />
      </TitleWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        {' '}
        <QuillContainer>
          <DynamicReactQuill
            forwardedRef={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={handleChange}
          />
        </QuillContainer>
      </Suspense>
    </Container>
  )
}

export default PostEditor

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  align-items: center;
`

const Header = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  gap: 1rem;
`
const TitleLabel = styled.label``

const TitleInput = styled.input`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  padding: 1rem;
`

const CategoryWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const WriteButton = styled.button`
  padding: 10px 15px;
  background-color: rgba(136, 137, 209, 0.12);
  color: #2a50da;
  font-size: 18px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
`

const QuillContainer = styled.div`
  width: 80%;
  height: 60%;

  .ql-editor {
    height: 40rem;
    overflow-y: scroll;
  }
`
