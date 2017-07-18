import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import injectResetCSS from './styling/reset.js'

ReactDOM.render(<App />, document.getElementById('root'))

injectResetCSS()

const geocodingAPI = 'AIzaSyARskRITax7crxUP7M24dvyEgibHSyx5qo'
const placesAPI = 'AIzaSyBtETiDJTufOEY8APseDuM6YHUWYoxLR_0'
