import React, { Component } from "react";
import "./App.css";
import GetForecast from "./components/forecast/GetForecast";
import GetGif from "./components/gif/GetGif";
import { getSearchTerms, ForecastMatcher } from "./components/forecast/helpers";
import Loading from "./components/Loading";

const cities = {
  chicago: {
    latitude: 41.881832,
    longitude: -87.623177
  }
};

const forecastMatchers: ForecastMatcher[] = [
  {
    searchTerm: "arctic",
    match: ({ temperature }) => temperature <= 0
  },
  {
    searchTerm: "freezing",
    match: ({ temperature }) => temperature <= 32
  },
  {
    searchTerm: "chilly",
    match: ({ temperature }) => temperature > 32 && temperature <= 50
  },
  {
    searchTerm: "rain",
    match: ({ precipType }) => !!precipType && precipType.includes("rain")
  },
  {
    searchTerm: "snow",
    match: ({ precipType }) => !!precipType && precipType.includes("snow")
  },
  {
    searchTerm: "hot",
    match: ({ temperature }) => temperature > 80
  },
  {
    searchTerm: "cloudy",
    match: ({ summary }) => summary.toLowerCase().includes("cloudy")
  },
  {
    searchTerm: "weather",
    match: () => true
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <main className="container">
          <h1 className="app-title">WeatherGif</h1>
          <p className="description">What is the weather like right now?</p>
          <GetForecast {...cities["chicago"]}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Loading />;
              }
              if (error) {
                return <div className="error">{error.message}</div>;
              }
              if (data) {
                const searchTerms = getSearchTerms(data, forecastMatchers);
                return (
                  <GetGif searchTerms={searchTerms}>
                    {({ loading, error, data }) => {
                      if (loading) {
                        return <Loading />;
                      }
                      if (error) {
                        return <div className="error">{error.message}</div>;
                      }
                      if (data) {
                        return (
                          <React.Fragment>
                            <div className="image-container">
                              <img
                                src={data.images.original.url}
                                alt={data.slug}
                              />
                            </div>
                            <p>Search terms: {searchTerms.join(", ")}</p>
                          </React.Fragment>
                        );
                      }
                      return <div>No data returned from search</div>;
                    }}
                  </GetGif>
                );
              }
            }}
          </GetForecast>
        </main>
      </div>
    );
  }
}

export default App;
