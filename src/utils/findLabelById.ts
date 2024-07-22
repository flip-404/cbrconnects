import NavsData from '@/mocks/NavsData'

function findLabelById(id: string) {
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

export default findLabelById
