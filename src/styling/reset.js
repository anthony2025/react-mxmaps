import {injectGlobal} from 'styled-components'

export default () => injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1;
    font-family: Open Sans, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  a,
  button {
    text-decoration: none;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    border: 0;
    background: none;
    cursor: pointer;
    transition: .3s;
  }
`
