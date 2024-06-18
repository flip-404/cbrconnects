import NavButton from './NavButton'

const NavLinks = [
  {
    content: '커뮤니티',
    href: '/community',
    id: 'community',
    submenu: [
      { id: 'freeboard', label: '자유게시판', href: '/community/freeboard' },
      { id: 'club', label: '동호회/모임', href: '/community/club' },
      { id: 'news', label: '호주뉴스', href: '/community/news' },
      {
        id: 'yesmigration',
        label: '예스이민',
        href: '/community/yesmigration',
      },
      { id: 'parcel', label: '한인전문택배', href: '/community/parcel' },
      { id: 'business', label: '업소록', href: '/community/business' },
    ],
  },
  {
    content: '구인/구직',
    href: '/job',
    id: 'job',
    submenu: [
      { id: 'offer', label: '구인', href: '/job/offer' },
      { id: 'search', label: '구직', href: '/job/search' },
    ],
  },
  { content: '쿼카마켓', href: '/market', id: 'market' },
  {
    content: '렌트/쉐어',
    href: '/rentshare',
    id: 'rentshare',
    submenu: [
      { id: 'rent', label: '렌트', href: '/rentshare/rent' },
      { id: 'share', label: '쉐어', href: '/rentshare/share' },
    ],
  },
]

function NavBar() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[57px] justify-evenly items-center shadow-sm">
        {NavLinks.map((link) => (
          <NavButton
            key={link.id}
            content={link.content}
            href={link.href}
            submenu={link.submenu}
          />
        ))}
      </div>
    </div>
  )
}

export default NavBar
