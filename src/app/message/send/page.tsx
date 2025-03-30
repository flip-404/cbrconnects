import { SendMessagePageStyle } from './page.css'
import SendForm from './SendForm'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

function SendMessagePage({ searchParams }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {}

  return (
    <div className={SendMessagePageStyle.container}>
      <h2 className={SendMessagePageStyle.title}>To. {searchParams.nickname}</h2>
      <SendForm reveiverId={searchParams.userId as string} />
    </div>
  )
}

export default SendMessagePage
