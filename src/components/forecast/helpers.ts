import { Forecast } from "./GetForecast";

export type ForecastMatcher = {
  searchTerm: string;
  match(forecast: Forecast): boolean;
};

export function getSearchTerms(
  forecast: Forecast,
  matchers: ForecastMatcher[]
) {
  return matchers.reduce(
    (prevSearchTerms, matcher) => {
      if (matcher.match(forecast)) {
        prevSearchTerms.push(matcher.searchTerm);
      }
      return prevSearchTerms;
    },
    [] as string[]
  );
}
