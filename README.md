# React MX Maps

<img src="./public/logo.png" height="300px" width="auto"/>

[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)

This is a solution to a React coding challenge used to help evaluate candidates interested in joining the team at [Generation Mexico]. We are given three user stories and a list of data.

This is live at: [https://mxmaps.anthonyascencio.me](https://mxmaps.anthonyascencio.me)

## Table of Contents
- [User Stories](#stories)
- [Rules](#rules)
- [Screenshots](#screenshots)
- [Walkthrough](#walkthrough)
  - [Loading the API](#first)
  - [Rendering the map](#second)
  - [Geocoding the markers](#third)
  - [Rendering the markers](#fourth)
  - [Finishing the UI](#fifth)
- [Prerequisites](#prerequisites)
- [License](#license)

## User Stories
<div id='stories'/>

- [x] As a student, I want to see a map of Mexico City.
- [x] As a student, I want to see a map that has all the stores represented as markers/pins on the map.
- [] As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'

## Rules
<div id='rules'/>

- We should use React and Google Maps, but no Redux.
- Any other libraries and approaches are fair game.
- We should focus on the user over the technology used.
- And we should include some documentation, screenshots, and tests.

## Screenshots
<div id='screenshots'/>
![Screenshot1](/public/screenshot1.png?raw=true)
![Screenshot2](/public/screenshot2.png?raw=true)

## Walkthrough
<div id='walkthrough'/>

### First step: loading the Google Maps API
<div id='first'/>
Google hasn't made it easy to load the Maps API library. At least for web clients only a script tag is provided, with an optional callback. This gives us a couple of headaches:

  - It forces us to expose a "google" global variable, a usual no-no for current codebases.
  - To make sure this global variable will be available in our code, the script can be loaded in the head, but this blocks html parsing until it finishes executing. Alternatively we could use its optional callback to call a global function of our own, but this escapes React flow.

A variety of approaches (see [FullStackReact] in depth one) can be followed to load the script asynchronously, while making sure not to execute code before the global variable is available. All of these are too involved for a demo application, but definitely necessary on production.

If loading the script directly from html, you must make sure to async and defer the request to make sure html parsing is not interrupted until the script finishes downloading and executing.

Fortunately the third-party Maps rendering library I ended up using, [google-map-react], handles the loading of the script asynchronously and we can save ourselves from this mess. Documentation is lacking, but from the source code we can pass the apiKey inside a bootstrapURLKeys prop.

### Second step: rendering the map in React
<div id='second'/>
The Google Maps API renders the map on the DOM itself. Just like React, a reference to a div must be passed along for the API to do take control of.
React runs into issues when another library manipulates the same sections of the DOM directly, which is also why you shouldn't use jQuery with React.

An additional layer must be used to isolate the DOM manipulation of the Maps API from React. I tried [google-maps-react] and [react-google-maps], but found both slightly outdated or missing critical documentation. Still either of these approaches are much more powerful and a better bet for the future if time is not a constraint.

To fulfill just the necessary functionality of this demo a more minimal library was used, [google-map-react]. This library provides you a component to render the map in, and accepts children components of any kind as Markers.
This is exactly all we need for these user stories, but if we wanted more advanced features of the Google API one of the former two libraries would be a better choice.

### ~~Third step: rendering the markers~~

Noooot so fast, first we need their coordinates... Welcome to a magical side adventure in geocoding! :steam_locomotive::train::train::train:

### Third step: geocoding the markers
<div id='third'/>

## Prerequisites
<div id='prerequisites'/>

Node 8.x must be installed globally for the parser script to run. For both the script and the website to work properly an environment variable ```REACT_APP_GAPI_KEY``` must be provided with a valid Google Maps API key. It took a few thousand requests to parse the ~250 addresses, and a free account limits you to 1000 requests a day. You can either enable billing or run it in batches...

This project currently uses [create-react-app], this gives us absolute import paths, environment variables, and an already optimized webpack config.

- `$ yarn install` installs all the necessary dependencies.
- `$ yarn start` will run the app in a development server.
- `$ yarn parse` runs the node script to geocode our dataset.

## License
<div id='license'/>

This project is dedicated to the public domain, with a CC0 license.
The libraries used are property of their respective authors.

Google wants us to show their logo whenever their api's are used, so here it is...

![cc0 badge](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)

![Powered by Google](./public/google.png?raw=true)

[google-maps-react]: https://github.com/fullstackreact/google-maps-react
[google-map-react]: https://github.com/istarkov/google-map-react
[react-google-maps]: https://github.com/tomchentw/react-google-maps
[FullStackReact]: https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663(
[Generation Mexico]: https://www.generationinitiative.org/mexico/
[create-react-app]: https://github.com/facebookincubator/create-react-app
