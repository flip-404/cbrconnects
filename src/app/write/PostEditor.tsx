/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import styled from 'styled-components'
import { useSearchParams } from 'next/navigation'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ImageResize from 'quill-image-resize-module-react'
import { ImageDrop } from 'quill-image-drop-module'
import { Quill } from 'react-quill'
import ImageLoadingIcon from '@/assets/ImageLoading.gif'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />
    }
  },
  {
    ssr: false,
  },
)

function PostEditor() {
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const quillRef = useRef()

  const searchParams = useSearchParams()

  const mainCategory = searchParams.get('mainCategory')
  const subCategory = searchParams.get('subCategory')

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
      const range = quillObj?.getSelection()!

      quillObj.insertEmbed(range.index, 'image', '/ImageLoading.gif')

      const { imageURL } = await fetch(`/api/image`, {
        method: 'POST',
        body: formData,
      }).then((res) => {
        quillObj.deleteText(range.index, 1)
        return res.json()
      })
      quillObj?.insertEmbed(range.index, 'image', `${imageURL}`)
      quillObj.setSelection(range.index + 1)
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

  const handdleWritePost = async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        userId: session?.user.id,
        mainCategory: firstNavItem.id,
        ...(secondNavItem && { subCategory: secondNavItem.id }),
        thumbnail: 'https://picsum.photos/id/237/200/300',
        isNotice: false,
      }),
    })

    await response.json()
  }

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <Header>
        <CategoryWrapper>
          {firstNavItem.label} - {secondNavItem?.label}
        </CategoryWrapper>
        <WriteButton onClick={handdleWritePost}>글 작성</WriteButton>
      </Header>
      <TitleWrapper>
        <TitleLabel htmlFor="titleLabelInput">제목</TitleLabel>
        <TitleInput
          id="titleInput"
          placeholder="게시글 제목을 입력해주세요"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
        />
      </TitleWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        {' '}
        <QuillContainer>
          <ReactQuill
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
  padding: 10px;
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
  font-size: 18px;
`

const QuillContainer = styled.div`
  width: 80%;
  height: 60%;

  .ql-editor {
    height: 40rem;
    overflow-y: scroll;
  }
`
