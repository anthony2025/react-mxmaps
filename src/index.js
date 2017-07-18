import React from 'react'
import {render} from 'react-snapshot'
import App from 'components/App'

import Raven from 'raven-js'
import registerServiceWorker from 'utils/serviceWorker.js'

import injectResetCSS from 'styling/reset.js'
import {ThemeProvider} from 'styled-components'
import theme from 'styling/theme'

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

Raven.config(process.env.REACT_APP_RAVEN_URL).install()
injectResetCSS()
registerServiceWorker()
