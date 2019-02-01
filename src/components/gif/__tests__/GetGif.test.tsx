import React from "react";
import axios from "axios";
import { render, wait } from "react-testing-library";
import GetGif, { GetGifState } from "../GetGif";
import sampleRespose from "../__fixtures__/sampleRespose";

// This component allows us to test the child props separate from any logic in the App component.
const TestComponent: React.SFC<GetGifState> = ({ loading, error, data }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data) {
    return <div>{data.images.original.url}</div>;
  }
  return <div>No data returned</div>;
};

describe("GetGif", () => {
  jest.spyOn(axios, "get").mockResolvedValue({
    data: sampleRespose
  });
  it("is initially loading", () => {
    const { container } = render(
      <GetGif searchTerms={[]}>{props => <TestComponent {...props} />}</GetGif>
    );

    expect(container.innerHTML).toContain("Loading...");
  });

  it("returns the data for the first search result", async () => {
    const { container } = render(
      <GetGif searchTerms={[]}>{props => <TestComponent {...props} />}</GetGif>
    );

    await wait();

    expect(container.innerHTML).toContain(
      "http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.gif"
    );
  });
});
