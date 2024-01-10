const WELCOME_MESSAGE = `# Welcome to NewTab!

## Features

1. Private: Stores your data locally on your browser.
2. Fast: It takes less than a second to load.
3. For developers: It uses *markdown* syntax and \`monaco-editor\`, so you can use any Visual Studio Code keybindings you're already familiar with.

## How to use NewTab?

- I recommend setting this page as the default page when opening a new tab in your browser so you can have your notes always in sight. Depending on your browser, you may need an extension to do that.
- You can change tabs using the top buttons.
- Start editing this text right here. Have fun!
`

export const DEFAULT_DATA = {
  active: '1',
  tabs: [
    {
      id: '1',
      name: 'Tasks',
      text: WELCOME_MESSAGE,
    },
    {
      id: '2',
      name: 'Notes',
      text: `# Notes\n\n`,
    },
    {
      id: '3',
      name: 'General',
      text: `# General\n\n`,
    },
    {
      id: '4',
      name: 'Other',
      text: `# Other\n\n`,
    },
  ],
}
