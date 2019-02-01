import { getSearchTerms, ForecastMatcher } from "../helpers";

describe("getSearchTerms", () => {
  it("adds search term based on matchers", () => {
    const temperatureMap: ForecastMatcher[] = [
      {
        searchTerm: "arctic",
        match: ({ temperature }) => temperature < 0
      }
    ];

    const forecast1 = {
      summary: "Frozen tundra",
      temperature: -10
    };

    const forecast2 = {
      summary: "Chicago weather",
      temperature: 12
    };

    expect(getSearchTerms(forecast1, temperatureMap)).toContain("arctic");
    expect(getSearchTerms(forecast2, temperatureMap)).toHaveLength(0);
  });

  it("adds multiple search terms", () => {
    const temperatureMap: ForecastMatcher[] = [
      {
        searchTerm: "freezing",
        match: ({ temperature }) => temperature <= 32
      },
      {
        searchTerm: "rain",
        match: ({ precipType }) => precipType === "rain"
      }
    ];

    const forecast = {
      summary: "Chicago weather",
      temperature: 12,
      precipType: "rain"
    };

    expect(getSearchTerms(forecast, temperatureMap)).toEqual([
      "freezing",
      "rain"
    ]);
  });
});
