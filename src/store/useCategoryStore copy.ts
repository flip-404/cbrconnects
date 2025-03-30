import { CategoryType } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CategoryState {
  category: CategoryType
  setCategory: (category: CategoryType) => void
}

const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      category: 'NOTICE',
      setCategory: (category) => set({ category }),
    }),
    {
      name: 'category-storage',
    },
  ),
)

export default useCategoryStore
