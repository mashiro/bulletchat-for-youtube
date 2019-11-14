import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { OptionPage } from './components/OptionsPage'
import { theme } from './theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <OptionPage />
      </div>
    </ThemeProvider>
  )
}

export default App
