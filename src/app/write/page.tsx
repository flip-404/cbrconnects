/* eslint-disable import/no-extraneous-dependencies */

'use client'

import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '@/styles/react-quill-custom.css'

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
    <div className="flex flex-col gap-[20px] w-screen h-screen p-10 items-center">
      <div className="w-4/5 flex justify-between">
        <div>커뮤니티 - 자유게시판</div>
        <div>글 작성</div>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        style={{ width: '80%', height: '60%' }}
        onChange={handleChange}
      />
    </div>
  )
}

export default Write
