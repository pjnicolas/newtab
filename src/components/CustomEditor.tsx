import { useEffect, useState } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { useDataStore } from '@/lib/store'

const CustomEditor = () => {
  const monaco = useMonaco()
  const [themeDefined, setThemeDefined] = useState(false)
  const { tabs, active, setCurrentText } = useDataStore()
  const currentTab = tabs.find((tab) => tab.id === active)

  useEffect(() => {
    if (!themeDefined && monaco) {
      setThemeDefined(true)
      monaco.editor.defineTheme('vs-dark-custom', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#1A1A1A',
          'editorLineNumber.foreground': '#85858540',
          'editorLineNumber.activeForeground': '#C6C6C680',
        },
      })
    }
  }, [monaco, themeDefined])

  if (!themeDefined || !currentTab)
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )

  return (
    <Editor
      height="100%"
      defaultLanguage="markdown"
      theme="vs-dark-custom"
      value={currentTab.text}
      onChange={(newValue) => {
        setCurrentText(newValue || '')
      }}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        quickSuggestions: false,
        formatOnPaste: false,
        formatOnType: false,
        hideCursorInOverviewRuler: true,
        fontSize: 20,
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        scrollbar: {
          vertical: 'visible',
          useShadows: false,
        },
      }}
    />
  )
}

export default CustomEditor
