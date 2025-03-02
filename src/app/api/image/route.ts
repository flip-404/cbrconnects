/* eslint-disable import/prefer-default-export */
import api from '@/libs/axiosInstance'
import { NextRequest, NextResponse } from 'next/server'

async function POST(request: NextRequest) {
  const formData = await request.formData()
  const imageFile = formData.get('file')

  if (!imageFile) {
    return new NextResponse(JSON.stringify({ ok: false, error: 'Image file is missing' }), {
      status: 400,
    })
  }

  const { result } = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload `,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CF_TOKEN}`,
      },
    },
  ).then((value) => value.json())

  const { uploadURL } = result

  const {
    data: { result: uploadResult },
  } = await api.post(uploadURL, formData)
  const { variants, filename } = uploadResult

  return new NextResponse(JSON.stringify({ ok: true, imageURL: variants[0], filename }))
}
export { POST }
