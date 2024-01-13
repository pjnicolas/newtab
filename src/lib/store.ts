import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IData } from '@/lib/types'
import { DEFAULT_DATA } from '@/lib/defaults'

interface IDataState extends IData {
  setText: (id: string, newText: string) => void
  setCurrentText: (newText: string) => void
  setActive: (id: string) => void
}

export const useDataStore = create<IDataState>()(
  persist(
    (set) => ({
      ...DEFAULT_DATA,

      setActive: (id) => set((state) => ({ ...state, active: id })),

      setText: (id, newText) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, text: newText } : tab
          ),
        })),

      setCurrentText: (newText) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === state.active ? { ...tab, text: newText } : tab
          ),
        })),
    }),
    {
      name: 'newtab-v2',
    }
  )
)
