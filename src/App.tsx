import CustomEditor from './components/CustomEditor'
import Header from './components/Header'

const App = () => {
  return (
    <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
      <h1 className="mt-16 mb-8">
        <Header />
      </h1>

      <div className="mb-8 mt-2 flex-1">
        <CustomEditor />
      </div>
    </div>
  )
}

export default App
