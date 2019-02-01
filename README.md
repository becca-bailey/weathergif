# WeatherGif

This is an application that will fetch current weather data from the [Dark Sky API](https://darksky.net/dev) and match it to a gif from the [Giphy API](https://developers.giphy.com/).

## Setup

Install dependencies (with yarn)

```
yarn install
```

## Running the application in development

To run locally, you will need API keys for the Dark Sky and Giphy APIs. Please see their documentation (linked above) for more details. You can pass these keys in as environment variables at runtime.

Example:

```
REACT_APP_GIPHY_KEY=<giphy key> REACT_APP_DARK_SKY_KEY=<dark sky key> yarn start
```

## Running tests

This application is tested with jest and [React Testing Library](https://github.com/kentcdodds/react-testing-library).

To run tests:

```
yarn test
```
