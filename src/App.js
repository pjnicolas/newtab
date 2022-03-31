import { useEffect, useState } from 'react'
import './App.css';

const LOCAL_STORAGE_KEY = 'config'

const DEFAULT_CONFIG = {
  currentTab: 0,
  styles: [
    { text: 'Monospace', value: true, style: { fontFamily: '"Courier New", Courier, monospace' } },
    { text: 'Justify', value: false, style: { textAlign: 'justify' } },
  ],
  tabs: [
    { text: 'Tab 1', data: 'Welcome to newtab! Edit this text right here, change tabs, or change styles using the buttons on the upper-right corner of the screen!\n\nYour text and settings are automatically saved to your PC.' },
    { text: 'Tab 2', data: '' },
    { text: 'Tab 3', data: '' },
  ],
}

const saveConfig = (cfg) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cfg))
}

const loadConfig = () => {
  try {
    const cfg = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (cfg && typeof cfg === 'object') {
      return cfg
    } else {
      throw new Error();
    }
  } catch {
    return DEFAULT_CONFIG
  }
}

const App = () => {
  const [styles, setStyles] = useState(null)
  const [currentTab, setCurrentTab] = useState(null)
  const [tabs, setTabs] = useState(null)

  useEffect(() => {
    const loadedConfig = loadConfig()
    setStyles(loadedConfig.styles)
    setTabs(loadedConfig.tabs)
    setCurrentTab(loadedConfig.currentTab)
  }, [])

  useEffect(() => {
    if (currentTab !== null) {
      saveConfig({ styles, currentTab, tabs })
    }
  }, [styles, currentTab, tabs])

  if (currentTab === null) {
    return (
      <button type="button" onClick={() => saveConfig(null)}>
        Reset config
      </button>
    )
  }

  return (
    <div className="app">
      <div className="style">
        {
          styles.map(({ text, value }, index) => (
            <button
              key={text}
              type="button"
              style={{
                opacity: value ? 0.5 : 0.2,
              }}
              onClick={() => {
                setStyles((s) => {
                  const copy = [...s]
                  copy[index].value = !value
                  return copy
                })
              }}
            >
              { text }
            </button>
          ))
        }
      </div>

      <div className="main">
        <div className="tabs">
        {
          tabs.map(({ text }, index) => (
            <button
              key={text}
              type="button"
              style={{
                fontWeight: currentTab === index ? 700 : 400,
                color: currentTab === index ? '#fff' : '#666',
              }}
              onClick={() => {
                setCurrentTab(index)
              }}
            >
              { text }
            </button>
          ))
        }
        </div>

        <textarea
          className="editor"
          value={tabs[currentTab].data}
          style={{
            ...styles.reduce((prev, curr) => {
              if (!curr.value) {
                return prev
              }
              return { ...prev, ...curr.style }
            }, {})
          }}
          onChange={(event) => {
            setTabs((t) => {
              const copy = [...t]
              copy[currentTab].data = event.target.value
              return copy
            })
          }}
        />
      </div>

    </div>
  );
}

export default App;
