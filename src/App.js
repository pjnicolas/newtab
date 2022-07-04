import { useEffect, useRef, useState } from 'react'
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

const findLineOfPosition = (data, position) => {
  let acc = 0
  for (let i in data) {
    acc += data[i].length + 1
    if (acc > position) {
      return Number(i)
    }
  }
}

const App = () => {
  const [styles, setStyles] = useState(null)
  const [currentTab, setCurrentTab] = useState(null)
  const [tabs, setTabs] = useState(null)
  const textAreaRef = useRef()
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)


  useEffect(() => {
    if (textAreaRef.current && textAreaRef.current === document.activeElement) {
      textAreaRef.current.selectionStart = selectionStart
      textAreaRef.current.selectionEnd = selectionEnd
    }
  })

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
          ref={textAreaRef}
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
            setSelectionStart(textAreaRef.current.selectionStart)
            setSelectionEnd(textAreaRef.current.selectionEnd)
            setTabs((t) => {
              const copy = [...t]
              copy[currentTab].data = event.target.value
              return copy
            })
          }}
          onSelect={() => {
            setSelectionStart(textAreaRef.current.selectionStart)
            setSelectionEnd(textAreaRef.current.selectionEnd)
          }}
          onKeyDown={(event) => {
            const { altKey, code } = event;

            const moveLine = (n) => {
              if (n !== -1 && n !== 1) {
                return
              }

              const position = textAreaRef.current.selectionStart
              const data = tabs[currentTab].data.split('\n')
              const line = findLineOfPosition(data, position)

              if ((line + n) >= 0 && (line + n) < data.length) {
                const arrayPrev = data.slice(0, line)
                const arrayLine = data.slice(line, line + 1)
                const arrayPost = data.slice(line + 1, data.length)

                let newData = null
                let tmpLength = 0
                if (n < 0) {
                  const tmp = arrayPrev.pop()
                  tmpLength = tmp.length
                  const newArray = [...arrayPrev, ...arrayLine, tmp, ...arrayPost]
                  newData = newArray.join('\n')
                } else if (n > 0) {
                  const tmp = arrayPost.shift()
                  tmpLength = tmp.length
                  const newArray = [...arrayPrev, tmp, ...arrayLine, ...arrayPost]
                  newData = newArray.join('\n')
                }

                setTabs((t) => {
                  const copy = [...t]
                  copy[currentTab].data = newData
                  return copy
                })

                setSelectionStart(position + (tmpLength + 1) * n)
                setSelectionEnd(position + (tmpLength + 1) * n)
              }
            }

            if (altKey) {
              if (code === 'ArrowUp') {
                moveLine(-1)
              } else if (code === 'ArrowDown') {
                moveLine(+1)
              }
            }
          }}
        />
      </div>

    </div>
  );
}

export default App;
