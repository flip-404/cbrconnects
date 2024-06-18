import NavsData from '@/mocks/NavsData'
import NavButton from './NavButton'

function NavBar() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[57px] justify-evenly items-center shadow-sm">
        {NavsData.map((link) => (
          <NavButton
            key={link.id}
            label={link.label}
            href={link.href}
            submenu={link.submenu}
          />
        ))}
      </div>
    </div>
  )
}

export default NavBar
