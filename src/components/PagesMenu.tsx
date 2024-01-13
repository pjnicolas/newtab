import { useDataStore } from '@/lib/store'
import PagesButton from './PagesButton'

const PagesMenu = () => {
  const active = useDataStore((state) => state.active)
  const tabs = useDataStore((state) => state.tabs)
  const setActive = useDataStore((state) => state.setActive)

  return (
    <div className="w-full h-full p-4 min-w-0 flex flex-row gap-1">
      {tabs.map((tab) => (
        <PagesButton
          key={tab.id}
          label={tab.name}
          active={tab.id === active}
          onClick={() => setActive(tab.id)}
        />
      ))}
    </div>
  )
}

export default PagesMenu
