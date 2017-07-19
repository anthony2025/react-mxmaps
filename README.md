# React MX Maps

<img src="./public/logo.png" height="300px" width="auto"/>

[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)

This is a solution to a React coding challenge used to help evaluate candidates interested in joining the team at [Generation Mexico]. We are given three user stories and a list of data.

This is live at: [https://mxmaps.anthonyascencio.me](https://mxmaps.anthonyascencio.me)

## Table of Contents
- [User Stories](#technologies)
- [Rules](#screenshot)
- [Screenshots](#screenshots)
- [Walkthrough](#walkthrough)
  - [Loading the API](#firstproblem)
  - [Rendering the map](#secondproblem)
  - [Geocoding the markers](#thirdproblem)
  - [Rendering the markers](#fourthproblem)
  - [Finishing the UI](#fifthproblem)
- [Prerequisites](#prerequisites)
- [Scripts](#scripts)
- [License](#license)

## User Stories
* As a student, I want to see a map of Mexico City.
* As a student, I want to see a map that has all the stores represented as markers/pins on the map.
* As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'

## Rules
* We should use React and Google Maps, but no Redux. Any other libraries and approaches can be followed.
* We should focus on the user experience over the technology stack.
* And we shall make sure to include some documentation, screenshots, comments and testing along the way.

## Screenshots


## Problems to solve

### First: loading the Google Maps API
Google hasn't made it easy to load the Maps API library. At least for web clients only a script tag is provided, with an optional callback. This gives us a couple of headaches:

  * It forces us to expose a "google" global variable, a usual no-no for current codebases.
  * To make sure this global variable will be available in our code, the script can be loaded in the head, but this blocks html parsing until it finishes executing. Alternatively we could use its optional callback to call a global function of our own, but this escapes React flow.

A variety of approaches (see [FullStackReact] in depth one) can be followed to load the script asynchronously, while making sure not to execute code before the global variable is available. All of these are too involved for a demo application, but definitely necessary on production.

If loading the script directly from html, you must make sure to async and defer the request to make sure html parsing is not interrupted until the script finishes downloading and executing.

Fortunately the third-party Maps rendering library I ended up using, [google-map-react], handles the loading of the script asynchronously and we can save ourselves from this mess. Documentation is lacking, but from the source code we can pass the apiKey inside a bootstrapURLKeys prop.

### Second: rendering the map in React
The Google Maps API renders the map on the DOM itself. Just like React, a reference to a div must be passed along for the API to do take control of.
React runs into issues when another library manipulates the same sections of the DOM directly, which is also why you shouldn't use jQuery with React.

An additional layer must be used to isolate the DOM manipulation of the Maps API from React. I tried [google-maps-react] and [react-google-maps], but found both slightly outdated or missing critical documentation. Still either of these approaches are much more powerful and a better bet for the future if time is not a constraint.

To fulfill just the necessary functionality of this demo a more minimal library was used, [google-map-react]. This library provides you a component to render the map in, and accepts children components of any kind as Markers.
This is exactly all we need for these user stories, but if we wanted more advanced features of the Google API one of the former two libraries would be a better choice.

### ~~Third: rendering the markers~~
Noooot so fast, first we need their coordinates... Welcome to a magical side adventure in geocoding! :steam_locomotive::train::train::train:

### Third: geocoding the markers

## Prerequisites
<div id='prerequisites'/>

This project currently uses [create-react-app], this gives us absolute import paths, environment variables, and an already optimized webpack config.
* `$ yarn install` installs all the necessary dependencies.
* `$ yarn parse` w.
* `$ yarn start` will run the app in a development server.
* `$ yarn test` will run our tests in Jest while in watch mode.

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
[create-react-app]:
