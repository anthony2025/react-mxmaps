import React from 'react'
import styled from 'styled-components'
import Map from './Map'

export default function App(props) {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`
