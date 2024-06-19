/* eslint-disable import/no-extraneous-dependencies */

'use client'

import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill-custom.css'
import styled from 'styled-components'

function Write() {
  const [content, setContent] = useState('')

  const modules = {
    toolbar: [
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
  }
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

  const handleChange = (value: string) => {
    setContent(value)
  }

  return (
    <Container>
      <Header>
        <Title>커뮤니티 - 자유게시판</Title>
        <WriteButton>글 작성</WriteButton>
      </Header>
      <QuillContainer>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleChange}
        />
      </QuillContainer>
    </Container>
  )
}

export default Write

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

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const WriteButton = styled.button`
  font-size: 18px;
`

const QuillContainer = styled.div`
  width: 80%;
  height: 60%;
`
