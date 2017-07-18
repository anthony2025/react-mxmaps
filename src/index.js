import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import injectResetCSS from './styling/reset.js'
import {ThemeProvider} from 'styled-components'
import theme from './styling/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

injectResetCSS()
