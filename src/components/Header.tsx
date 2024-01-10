import HeaderTabItem from './HeaderTabItem'
import { useDataStore } from '../lib/store'

const Header = () => {
  const { tabs, active, setActive } = useDataStore()

  return (
    <div className="flex flex-row w-full">
      {tabs.map((tab) => (
        <HeaderTabItem
          key={tab.id}
          name={tab.name}
          active={tab.id === active}
          onClick={() => setActive(tab.id)}
        />
      ))}
    </div>
  )
}

export default Header
