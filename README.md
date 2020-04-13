# Foursquare API Demo

https://sleepy-bayou-96332.herokuapp.com/

## Prerequisites

* [yarn](https://yarnpkg.com/)

## Building and running the application

1. Install dependencies

```bash
cd server
yarn
cd ../client
yarn
```

2. Run the application from the client folder using webpack-dev-server

```bash
cd client
yarn start
```

A new browser tab will automatically open.
This method uses a proxy to run alongside the Express server. Use this for development to take advantage of live reloading.

3. Build for production

```bash
cd client
yarn build
```

This will automatically copy the built assets to the server directory.

4. Run the application from the server folder

```bash
cd server
node index.js
```

Browse to `http://localhost:3001`.

## Running tests

```bash
cd client
yarn test
```

## Requirements

:white_check_mark: Use React to build client app
:white_check_mark: Use your web server of choice (Express)
:white_check_mark: Use Jest for unit testing
:white_check_mark: Use Foursquare API (https://developer.foursquare.com/docs/) to get a list of places by location

:white_check_mark: Use location services to detect current location
:white_check_mark: Make the web app responsive
:x: Paginate the results of your search
:white_check_mark: Make the web app hosted and publically accessible (https://sleepy-bayou-96332.herokuapp.com/)

## Design decisions

### Assumptions

* Support all browsers except for IE <11
* Support only venue search from Foursquare's API

### Use create-react-app to bootstrap the project

Create-react-app handled setting up tooling such as webpack and Babel, as well as providing scripts for starting the application and building production assets.

### Use Express as a web server

I've always found [Express](https://expressjs.com/) to be a good choice for quickly setting up small applications.

### Proxy requests to Foursquare's API

Proxying requests to Foursquare's API was necessary to avoid violating the same-origin policy. First, I set up a route in my Express server that mimics the structure of Foursquare's venue search endpoint. Then, the React UI makes requests to `/api/venues/search` instead of going to Foursquare's API directly. Express handles making requests to Foursquare and returns the results of the searches to the UI.

### Use Pure.css for basic form field styling

[Pure](https://purecss.io/) was something I found while looking for CSS to style my form fields. It's really lightweight, and it made the search textbox and buttons look great, quickly.

### Use flexbox for styling venue search results

Flexbox is a great way to powerfully and easily style elements in a grid or list. It's especially great for easily enabling responsive design. Notice how venues rearrange as you resize the browser window.

### Use testing-library/react to support writing unit tests

I usually use Enzyme, but [React Testing Library](https://github.com/testing-library/react-testing-library) came with create-react-app so I thought I would give it a try. It really does help with focusing on writing tests that don't dip into implementation details.

### Use Heroku for hosting and deploying

Heroku made it quick and easy to set up a place to host the application. Also it's free.

### Use ES5 in the server code to support older versions of Node.js

You may notice the server-side code doesn't use any of the more modern ES6+ features that I used in the client code. This is because I wanted to make sure the server could run on older versions of Node.js, in case someone trying to run this application didn't have the latest one.
