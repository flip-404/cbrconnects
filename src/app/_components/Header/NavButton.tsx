import cls from '@/utils/cls'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavsDataType } from '@/mocks/NavsData'

function NavButton({ label, href, submenu = [] }: NavsDataType) {
  const pathname = usePathname()
  const isActive = pathname.includes(href)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={() => setIsDropdownVisible(true)}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <Link
        href={href}
        className={cls(
          'text-xl font-[600] border-b-[3px] border-black ',
          isActive
            ? ''
            : 'border-transparent relative w-fit block after:block after:content-[""] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center',
        )}
      >
        {label}
      </Link>
      {submenu.length > 0 && isDropdownVisible && (
        <div className="flex flex-col absolute left-1/2 transform -translate-x-1/2 top-full bg-white border shadow-lg ">
          {submenu.map((item) => {
            console.log('is It? ', pathname === item.href)

            return (
              <Link
                scroll={false}
                prefetch
                key={item.id}
                href={item.href}
                className={cls(
                  pathname === item.href ? 'text-[#01A69F]' : 'text-black',
                  'font-600 text-nowrap min-w-0 px-4 py-2  hover:bg-gray-200 z-50',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NavButton
