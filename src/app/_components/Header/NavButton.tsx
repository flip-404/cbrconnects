import cls from '@/utils/cls'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavButtonProps = {
  content: string
  href: string
}

function NavButton({ content, href }: NavButtonProps) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)

  return (
    <Link
      href={href}
      className={cls(
        'text-xl font-[600] border-b-[3px] border-black ',
        isActive
          ? ''
          : 'border-transparent relative w-fit block after:block after:content-[""] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center',
      )}
    >
      {content}
    </Link>
  )
}

export default NavButton
