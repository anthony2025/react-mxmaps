import React from 'react'
// Think react-redux connect(mapToProps)(Component) HOC, but dumber

export default mapToProps => Comp => props =>
  <Comp {...mapToProps} {...props} />
