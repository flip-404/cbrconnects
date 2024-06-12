import SubRouteBar from '../SubRouteBar'
import NavButton from './NavButton'

const NavLinks = [
  { content: '커뮤니티', href: '/community', id: 1 },
  { content: '업소록', href: '/business', id: 2 },
  { content: '구인/구직', href: '/job', id: 3 },
  { content: '쿼카마켓', href: '/market', id: 4 },
  { content: '렌트/쉐어', href: '/rentshare', id: 5 },
]

function NavBar() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[57px] justify-evenly items-center shadow-sm">
        {NavLinks.map((link) => (
          <NavButton key={link.id} content={link.content} href={link.href} />
        ))}
      </div>
      <SubRouteBar />
    </div>
  )
}

export default NavBar
