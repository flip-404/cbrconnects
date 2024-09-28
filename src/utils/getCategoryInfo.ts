import NavsData from '@/mocks/NavsData'

export function findLabelById(id: string) {
  let label = ''

  NavsData.forEach((item) => {
    if (item.id === id) {
      label = item.label
    }
    if (item.submenu && !label) {
      item.submenu.forEach((subItem) => {
        if (subItem.id === id) {
          label = subItem.label
        }
      })
    }
  })

  return label
}

export function findIdByLabel(label: string | null) {
  if (!label) return null
  let id = ''

  NavsData.forEach((item) => {
    if (item.label === label) {
      id = item.id
    }
    if (item.submenu && !id) {
      item.submenu.forEach((subItem) => {
        if (subItem.label === label) {
          id = subItem.id
        }
      })
    }
  })

  return id
}
