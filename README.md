# React MX Maps: in progress

<img src="./public/logo.png" height="300px" width="auto"/>

[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)

This is a solution, demo and coming blog post to a coding challenge used to help evaluate candidates interested in joining the team at [Generation Mexico].

The demo is live at: [https://mxmaps.anthonyascencio.me](https://mxmaps.anthonyascencio.me)

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
- [ ] As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'

## Rules
<div id='rules'/>

- It must use React and Google Maps, but no Redux.
- Any other libraries and approaches are fair game.
- It should focus on the user over the technology used.
- It should include some documentation, screenshots, and tests.

## Screenshots
<div id='screenshots'/>

<img src="./public/screenshot_website.png" height="700px" width="auto"/>
<img src="./public/screenshot_script.png" height="700px" width="auto"/>

## Walkthrough
<div id='walkthrough'/>

### First step: loading the Google Maps API
<div id='first'/>

Google hasn't made it easy to load the [Maps API library][maps browser]. For web clients only a script tag is provided, with an optional callback. This gives us a few headaches:

  - It forces us to expose a "google" global variable, a total no-no practice.
  - To make sure this global variable will be available in our code, the script can be loaded in head, but this blocks html parsing until it finishes executing. Alternatively we could use its optional callback to call a global function of our own, but this escapes React flow.

A variety of approaches (see [FullStackReact] in depth one) can be followed to load the script asynchronously, while making sure not to execute code before the global variable is available. All of these are too involved for a demo, but necessary on production.

Fortunately the third-party Maps rendering library I ended up using, [google-map-react], handles the loading of the script asynchronously. Documentation is lacking but the source code reveals we can pass the apiKey inside a bootstrapURLKeys prop.

Side note, if you are loading the script directly from html, make sure to async and defer the request to assure html parsing is not interrupted until the script finishes downloading and executing.

### Second step: rendering the map in React
<div id='second'/>

The Google Maps API renders the map on the DOM itself. Just like React, a reference to a div must be passed along for the API to take control of.
React runs into issues when another library manipulates the same sections of the DOM directly, which is also why you shouldn't use jQuery with React.

An additional layer should be used to isolate the DOM manipulation of the Maps API from React. I tried [google-maps-react] and [react-google-maps], but found both either outdated or missing critical documentation. Still both these approaches are much more powerful and a better bet for the future if time is not a constraint.

To fulfill just the necessary functionality of this demo a more minimal library was used: [google-map-react]. This library provides you a component to render the map in, and accepts children components of any kind as Markers.
This is exactly all we need for these user stories, but if we wanted more advanced features from the Google API one of the former two libraries would be a better choice.

### ~~Third step: rendering the markers~~

Not so fast, first we need their coordinates: Welcome to a magical side quest in geocoding...

:steam_locomotive::train::train::train:

### Third step: geocoding the markers
<div id='third'/>

We need to geocode our addresses to be able to place them on the map. That means convert each address into exact coordinates {latitude, longitude}.

Because we are dealing with a fair amount of markers (~250), our best choice is to do this beforehand in the server, and cache or persist the results. I wrote a nodejs script to achieve this, plus Maps [node library][maps node].

The addresses proved impossible to reliable geocode directly by [Google Geocode][geocode] service. They seem to have been quite lazily typed, probably by some poor intern shackled in a basement. Even manual queries in the Maps website returned more errors than results.

Because of this I was forced to take some extreme steps to obtain less than ideal, but at least useable data:

1. Addresses are passed first to [Place Autocomplete][autocomplete] service. This service takes an ambiguous address, and tries to predict an unambiguous placeId identifying a precise location. It takes into account businesses, points of interest, and some typos.
2. If [Place Autocomplete][autocomplete] was succesful, we send the placeId to [Place Details][details] service ([Geocode][geocode] service does not accept placeId's in the node library), which between its results always returns an unambiguous location object {lat, lng}.

This is the approach google recommends for [automated systems processing ambiguous queries][best practices]. In a better world this flow would be enough, but our queries are stubborn. While I noticed a noticeable increase in matches, I was still left with only a tiny fraction of markers. A third radical step was needed.

3. Each address is run multiple times through the services, each time trimming more of it from the end. This has the effect of making the address more general, increasing our chances of finding a match.

This is a rather crude method, and at some point completely unprecise method, but it allowed me to geocode 41% of the markers. In a real application, similar but more sofisticated approaches can be used to increase both the accuracy, and the efficacy of our approach. Two possible examples:

- [Place Autocomplete][autocomplete] service allows you to set strict or lax boundaries in which to request the predictions. In our case by setting these boundaries to Mexico City we would cut a lot of the current noise and inacuraccy we are getting.
- We can parse the address to make our trimming more intelligent. [Query Autocomplete][query] service can helps us with this, by giving us substrings and matched terms of an address query.

But with over a hundred markers to play with we can leave Node land and go back to playing with React.

### Fourth step: rendering the markers
<div id='fourth'/>

Up until here the whole project moved painfully slowly. It took hours to iron out some of the implementation details of the api's, and new problems kept appearing like layers on an onion.

This step took around 30 minutes. 15 to select the right svg icon, 10 to add the github fork corner, 5 to map over our beautiful list of geocoded markers and render them all in ten lines of code.

The duper awesome [google-map-react] lets us just render our own components as map markers, allowing us to stay in React land. Consideration was taken into not lifting state too much, leaving it in Map component, to allow for App component to handle layout and shared state (favorite markers).

### Fifth step: finishing the UI
<div id='fifth'/>

This step is in progress, but it should be all smooth React sailing from here on.

## Prerequisites
<div id='prerequisites'/>

An environment variable ```REACT_APP_GAPI_KEY``` must be provided with a valid Google Maps API key.
It took a few thousand requests to parse the ~250 addresses, and a free account limits you to 1000 requests a day. You can either [enable billing][quota] or waste a life running it in batches...

Node 8.x must be installed globally for the parser script to run. This project currently uses [create-react-app], this gives us absolute import paths, environment variables, and an already optimized webpack config.

- `$ yarn install` installs all the necessary dependencies.
- `$ yarn start` will run the app in a development server.
- `$ yarn parse` runs the node script to geocode our dataset.

## License
<div id='license'/>

This project is dedicated to the public domain, with a CC0 license.
The libraries used are property of their respective authors.

Google wants us to show their logo whenever their api's are used. Because we just used them all, here it is in all its glory.

![cc0 badge](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)

![Powered by Google](./public/google.png?raw=true)

[google-maps-react]: https://github.com/fullstackreact/google-maps-react
[google-map-react]: https://github.com/istarkov/google-map-react
[react-google-maps]: https://github.com/tomchentw/react-google-maps
[FullStackReact]: https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663(
[Generation Mexico]: https://www.generationinitiative.org/mexico/
[create-react-app]: https://github.com/facebookincubator/create-react-app
[best practices]: https://developers.google.com/maps/documentation/geocoding/best-practices
[autocomplete]: https://developers.google.com/places/web-service/autocomplete
[query]: https://developers.google.com/places/web-service/query
[details]: https://developers.google.com/places/web-service/details
[maps node]: https://github.com/googlemaps/google-maps-services-js
[quota]: https://developers.google.com/places/web-service/usage
[geocode]: https://developers.google.com/maps/documentation/geocoding/start
[maps browser]: https://developers.google.com/maps/documentation/javascript/tutorial

[//]: # (I can't believe I'm almost done with this shit, god bless the queen, what a ride.)
