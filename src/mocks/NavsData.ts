export type NavsDataType = {
  label: string
  href: string
  submenu?: { id: string; label: string; href: string }[]
}

const NavsData = [
  {
    label: '커뮤니티',
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
    label: '구인/구직',
    href: '/job',
    id: 'job',
    submenu: [
      { id: 'offer', label: '구인', href: '/job/offer' },
      { id: 'search', label: '구직', href: '/job/search' },
    ],
  },
  { label: '쿼카마켓', href: '/market', id: 'market', submenu: [] },
  {
    label: '렌트/쉐어',
    href: '/rentshare',
    id: 'rentshare',
    submenu: [
      { id: 'rent', label: '렌트', href: '/rentshare/rent' },
      { id: 'share', label: '쉐어', href: '/rentshare/share' },
    ],
  },
]

export default NavsData
