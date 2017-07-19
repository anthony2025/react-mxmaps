import React from 'react'
import styled from 'styled-components'

import GithubCorner from 'components/GithubCorner'
import Map from 'components/Map'

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
