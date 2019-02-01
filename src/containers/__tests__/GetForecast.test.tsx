import GetForecast, { GetForecastState } from "../GetForecast";
import React from "react";
import axios from "axios";
import { render, wait } from "react-testing-library";

// This component allows us to test the child props separate from any logic in the App component.
const TestComponent: React.SFC<GetForecastState> = ({
  loading,
  error,
  data
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <p>Summary: {data.summary}</p>
        <p>Temperature: {data.temperature}</p>
      </div>
    );
  }
  return <div>No data returned</div>;
};

describe("GetForecast", () => {
  it("is initially loading", () => {
    jest.spyOn(axios, "get");

    const { container } = render(
      <GetForecast latitude={0} longitude={0}>
        {props => <TestComponent {...props} />}
      </GetForecast>
    );

    expect(container.innerHTML).toContain("Loading...");
  });

  it("returns current forecast data", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        currently: {
          summary: "Partly Cloudy",
          temperature: 10
        }
      }
    });

    const { container } = render(
      <GetForecast latitude={0} longitude={0}>
        {props => <TestComponent {...props} />}
      </GetForecast>
    );

    await wait();

    expect(container.innerHTML).not.toContain("Loading...");
    expect(container.innerHTML).toContain("Summary: Partly Cloudy");
    expect(container.innerHTML).toContain("Temperature: 10");
  });

  it("returns an error object if there is an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Some error"));

    const { container } = render(
      <GetForecast latitude={0} longitude={0}>
        {props => <TestComponent {...props} />}
      </GetForecast>
    );

    await wait();

    expect(container.innerHTML).not.toContain("Loading...");
    expect(container.innerHTML).toContain("Some error");
  });
});
