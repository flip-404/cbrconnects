export type NavsDataType = {
  id: number
  label: string
  href: string
  submenu?: { id: number; label: string; href: string }[]
}

const NavsData = [
  {
    label: '커뮤니티',
    href: '/community',
    id: 1,
    submenu: [
      { id: 25, label: '자유게시판', href: '/community/freeboard' },
      { id: 26, label: '동호회/모임', href: '/community/club' },
      { id: 27, label: '호주뉴스', href: '/community/news' },
      {
        id: 28,
        label: '예스이민',
        href: '/community/yesmigration',
      },
      { id: 29, label: '한인전문택배', href: '/community/parcel' },
    ],
  },
  {
    label: '구인구직',
    href: '/job',
    id: 2,
    submenu: [
      { id: 30, label: '구인', href: '/job/offer' },
      { id: 31, label: '구직', href: '/job/search' },
    ],
  },
  { label: '쿼카마켓', href: '/market', id: 3, submenu: [] },
  {
    label: '렌트/쉐어',
    href: '/rentshare',
    id: 4,
    submenu: [
      { id: 32, label: '렌트', href: '/rentshare/rent' },
      { id: 33, label: '쉐어', href: '/rentshare/share' },
    ],
  },
  {
    label: '업소록',
    href: '/business',
    id: 5,
    submenu: [
      { id: 34, label: '한인기관', href: '/business/rent' },
      { id: 35, label: '건축', href: '/business/share' },
      { id: 36, label: '교육', href: '/business/share' },

      { id: 37, label: '디저트', href: '/business/share' },
      { id: 38, label: '레스토랑', href: '/business/share' },
      { id: 39, label: '마트', href: '/business/share' },
      { id: 40, label: '마케팅', href: '/business/share' },
      { id: 41, label: '물류', href: '/business/share' },
      { id: 42, label: '부동산', href: '/business/share' },
      { id: 43, label: '베이커리/카페', href: '/business/share' },
      { id: 44, label: '뷰티', href: '/business/share' },
      { id: 45, label: '자동차', href: '/business/share' },
      { id: 46, label: '피트니스', href: '/business/share' },
      {
        id: 47,
        label: '미용/클리닉',
        href: '/business/share',
      },
      { id: 48, label: '의류', href: '/business/share' },
    ],
  },
]

export default NavsData
