import React from 'react'
import styled from 'styled-components'
import MapContainer from './MapContainer'

export default function App(props) {
  return (
    <Wrapper>
      <MapContainer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
