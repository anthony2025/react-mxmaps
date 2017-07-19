// Think react-redux connect(mapToProps)(Component) HOC, but dumber
// TODO: handle mapToProps as a function, right now only an object is supported
import React from 'react'

export default mapToProps => Comp => props =>
  <Comp {...mapToProps} {...props} />
