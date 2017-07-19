import styled from 'styled-components'
import svg from './marker.svg'

const Marker = styled.img.attrs({
  src: svg,
  alt: 'marker'
})`
  height: 50px;
  width: 50px;
`

export default Marker
