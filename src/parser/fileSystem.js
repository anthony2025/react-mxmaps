// Wrapping a couple implementation details of our fs functions to keep our main
// index.js clean and slim. Node can require json files natively, synchronously,
// but its nice to hide details like normalizing paths, parsing JSON, etc.
const fs = require('fs')
const path = require('path')

// TODO: improve this function to handle appending to JSON correctly
// Now its just dumb pasting lines at the end, breaking syntax and requiring manual formatting
function appendLineToFile(file, line) {
  const fileName = path.join(__dirname, file)
  const serializedLine = JSON.stringify(line)
  fs.appendFile(fileName, serializedLine, err => {
    if (err) return console.log('error in appendLineToFile: ', err)
    console.log('Line appended succesfully!')
  })
}

function readFileAsync(file, cb) {
  const fileName = path.join(__dirname, file)
  fs.readFile(fileName, 'utf8', (err, rawData) => {
    if (err) return console.log('error in readFileAsync: ', err)
    let parsedData = JSON.parse(rawData)
    cb(rawData)
  })
}

function readFileSync(file) {
  const fileName = path.join(__dirname, file)
  const rawData = fs.readFileSync(fileName, 'utf8')
  const parsedData = JSON.parse(rawData)
  return parsedData
}

// TODO: this shouldn't be necessary if we keep optimizing our main loop
function deduplicateMarkersJsonFile(inFile, outFile) {
  let foundNames = []
  readFileSync(inFile).map(marker => {
    if (foundNames.indexOf(marker.text) === -1) {
      appendLineToFile(outFile, marker)
      foundNames.push(marker.text)
    }
  })
}

module.exports = {
  appendLineToFile,
  readFileAsync,
  readFileSync,
  deduplicateMarkersJsonFile
}
