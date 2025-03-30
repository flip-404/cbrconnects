import { useSearchParams } from 'next/navigation'
import { SendMessagePageStyle } from './page.css'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

function SendMessagePage({ searchParams }: Props) {
  console.log('searchParams', searchParams.userId)
  console.log('searchParams', searchParams.nickname)

  return (
    <div className={SendMessagePageStyle.container}>
      <h2 className={SendMessagePageStyle.title}>To. {searchParams.nickname}</h2>
      <form className={SendMessagePageStyle.form}>
        <textarea
          placeholder="내용을 입력해주세요."
          className={SendMessagePageStyle.content}
        ></textarea>
        <input
          type="submit"
          className={SendMessagePageStyle.sendButton}
          value={'쪽지 보내기'}
        ></input>
      </form>
    </div>
  )
}

export default SendMessagePage
