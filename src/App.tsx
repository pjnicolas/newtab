import CustomEditor from '@/components/CustomEditor'
import PagesMenu from './components/PagesMenu'

const App = () => {
  return (
    <div className="mx-auto max-w-screen-lg h-screen flex flex-col py-14">
      <div className="mb-6">
        <PagesMenu />
      </div>

      <div className="flex-1">
        <CustomEditor />
      </div>
    </div>
  )
}

export default App
