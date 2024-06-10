import SubRouteBar from '../SubRouteBar'
import NavButton from './NavButton'

const NavLinks = [
  { content: '커뮤니티', href: 'community', id: 1 },
  { content: '구인/구직', href: 'recruit', id: 2 },
  { content: '쿼카마켓', href: 'market', id: 3 },
  { content: '렌트/쉐어', href: 'rent', id: 4 },
  { content: '호주소식', href: 'news', id: 5 },
]

function NavBar() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[57px] justify-evenly items-center">
        {NavLinks.map((link) => (
          <NavButton key={link.id} content={link.content} href={link.href} />
        ))}
      </div>
      <SubRouteBar />
    </div>
  )
}

export default NavBar
