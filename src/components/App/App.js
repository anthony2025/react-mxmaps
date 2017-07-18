import React from 'react'
import styled from 'styled-components'

import Map from 'components/Map'
import GithubCorner from 'components/GithubCorner'

export default function App(props) {
  return (
    <Wrapper>
      <GithubCorner />
      <Map />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
