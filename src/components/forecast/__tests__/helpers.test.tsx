import { getSearchTerms, TemperatureMatcher } from "../helpers";

describe("getSearchTerms", () => {
  it("adds the precipitation if it exists", () => {
    const forecast = {
      summary: "Raining",
      precipType: "rain",
      temperature: 40
    };

    expect(getSearchTerms(forecast)).toContain("rain");
  });

  it("adds search term based on temperature matchers", () => {
    const temperatureMap: TemperatureMatcher[] = [
      {
        searchTerm: "arctic",
        match: temperature => temperature < 0
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
});
