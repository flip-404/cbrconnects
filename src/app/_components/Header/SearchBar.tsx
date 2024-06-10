import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SearchBar() {
  const router = useRouter()

  return (
    <div className="flex h-[96px] justify-center items-center gap-[20px]">
      <Link className="text-[32px] font-[700]" href="/">
        <span className="text-[#3B4890]">캔버라</span>
        커넥트
      </Link>
      <div className="flex gap-[10px] px-[10px] py-[10px] border rounded-[16px] flex-[0.5]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.5"
        >
          <path
            d="M38.5977 41.0127L23.9426 26.3576C22.7759 27.3208 21.4343 28.0747 19.9176 28.6191C18.4009 29.1635 16.8319 29.4358 15.2106 29.4358C11.2225 29.4358 7.8473 28.0549 5.08494 25.2933C2.32258 22.5316 0.941406 19.1573 0.941406 15.1703C0.941406 11.1832 2.32223 7.80767 5.08389 5.04356C7.84555 2.27949 11.2199 0.897461 15.2069 0.897461C19.1939 0.897461 22.5695 2.27864 25.3336 5.041C28.0977 7.80335 29.4798 11.1786 29.4798 15.1666C29.4798 16.8328 29.2001 18.4243 28.6406 19.941C28.0812 21.4576 27.3349 22.7769 26.4015 23.8986L41.0567 38.5538L38.5977 41.0127ZM15.2106 25.9359C18.217 25.9359 20.7635 24.8926 22.85 22.8061C24.9366 20.7195 25.9798 18.173 25.9798 15.1666C25.9798 12.1602 24.9366 9.61371 22.85 7.52716C20.7635 5.44062 18.217 4.39734 15.2106 4.39734C12.2041 4.39734 9.65765 5.44062 7.57111 7.52716C5.4846 9.61371 4.44135 12.1602 4.44135 15.1666C4.44135 18.173 5.4846 20.7195 7.57111 22.8061C9.65765 24.8926 12.2041 25.9359 15.2106 25.9359Z"
            fill="#828282"
          />
        </svg>
        <input className="outline-none flex-1 " placeholder="게시글 검색" />
      </div>
      <button
        type="button"
        className="py-[10px] px-[20px] border-[2px] border-black rounded-[100px] text-[12px] font-[700]"
        onClick={() => {
          router.push('/signin')
        }}
      >
        가입 · 로그인
      </button>
    </div>
  )
}

export default SearchBar
