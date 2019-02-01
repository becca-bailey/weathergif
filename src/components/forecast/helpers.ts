import { Forecast } from "./GetForecast";

export type TemperatureMatcher = {
  searchTerm: string;
  match(temperature: number): boolean;
};

export function getSearchTerms(
  forecast: Forecast,
  temperatureMatchers?: TemperatureMatcher[]
) {
  const searchTerms = [];
  if (forecast.precipType) {
    searchTerms.push(forecast.precipType);
  }
  if (temperatureMatchers) {
    temperatureMatchers.forEach(matcher => {
      if (matcher.match(forecast.temperature)) {
        searchTerms.push(matcher.searchTerm);
      }
    });
  }
  return searchTerms;
}
