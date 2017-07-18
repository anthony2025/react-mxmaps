This is a React coding challenge used to help evaluate candidates interested in joining the team at Generation Mexico. We are only given three user stories and a list of data.

We should use React and Google Maps, and no Redux. Any other libraries and approaches can be used, but we should focus on the user experience over the technologies used. And make sure to include some documentation, comments and testing along the way.

## User Stories

* As a student, I want to see a map of Mexico City.
* As a student, I want to see a map that has all the stores represented as markers/pins on the map.
* As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'

## Problems to solve

### First: loading the Google Maps API
Google hasn't made it easy to load the Maps API library. At least for web clients only a script tag is provided, with an optional callback. This gives us a couple of headaches:

  * It forces us to expose a "google" global variable, a usual no-no for current codebases.
  * The script can either be loaded in the head and block all js until it finishes loading, or it can be called after the body and use its optional callback to call a global function of our own, something that escapes the React flow.

A variety of approaches can be followed to mitigate these issues, all of which are too involved for a demo application, but definitely necessary on production.
[FullStackReact] approach was the most promising and documented one. For this demo I decided to load the script in the head, which again blocks all js and will affect initial loading of the app. DO NOT DO THIS IN PRODUCTION.

### Second: rendering the map in React
The Google Maps API renders the map on the DOM itself. Just like React, a reference to a 'root' div must be passed along for the API to do take control of.
React runs into issues when another library manipulates the same sections of the DOM directly, which is also why you shouldn't use jQuery with React.

An additional layer must be used to isolate the DOM manipulation of the maps API from React. I tried [google-maps-react] and [react-google-maps], but found both slightly outdated or missing critical documentation. Still either of these approaches would be much more powerful and is a better bet for the future if time is not a constraint.

To fulfill just the necessary functionality of this demo a more minimal library was used, [google-map-react]. This library provides you a component to render the map in, and accepts children components of any kind as Markers.
This is exactly all we need for these user stories, but if we wanted more advanced features of the Google API one of the former two libraries would be a better choice.

### ~~Third: rendering the markers~~
Noooot so fast, first we need their coordinates! welcome to the magical side adventure of geocoding.

### Third: geocoding the markers
 

[google-maps-react]: https://github.com/fullstackreact/google-maps-react
[google-map-react]: https://github.com/istarkov/google-map-react
[react-google-maps]: https://github.com/tomchentw/react-google-maps
[FullStackReact]: https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663(
