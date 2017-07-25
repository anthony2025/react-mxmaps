// This script can be used to ensure and get rid of duplicates on our markers
// list. If any escapes, React should take care of it if we set correctly a key

const fs = require('fs')
const path = require('path')

const PARSED_FILENAME = path.join(__dirname, '../data/parsed_markers.json')
const FINAL_FILENAME = path.join(__dirname, '../data/final_markers.json')

const parsedMarkers = require(PARSED_FILENAME)
const contents = []

parsedMarkers.map(marker => {
  if (!contents.map(i => i.text).includes(marker.text)) contents.push(marker)
})

const serializedContents = JSON.stringify(contents)
fs.writeFileSync(FINAL_FILENAME, serializedContents)
