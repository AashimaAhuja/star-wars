import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "regenerator-runtime/runtime.js";

jest.mock(
  "../../components/Header/Header",
  () =>
    ({ onMovieSearch }: { onMovieSearch: (query: string) => void }) =>
      (
        <input
          data-testid="header"
          onChange={({ target: { value } }) => onMovieSearch(value)}
        />
      )
);

jest.mock("../../services/movieService", () => ({
  getMovieList: jest.fn(() => ({
    then: () => ({
      catch: jest.fn(),
    }),
  })),
}));

import Home from "./Home";
import userEvent from "@testing-library/user-event";
import { getMovieList } from "../../services/movieService";

const mockData = {
  results: [
    {
      title: "A New Hope",
      episode_id: 4,
      url: "/test/1",
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: "George Lucas",
      producer: "Gary Kurtz, Rick McCallum",
    },
  ],
};

describe("Home Page", () => {
  beforeEach(() => {
    (getMovieList as jest.Mock).mockClear();
  });

  test("renders Home component", () => {
    render(<Home />);
  });

  test("Initial Loading State", async () => {
    const { getByTestId } = render(<Home />);
    await waitFor(() => expect(getByTestId("loader")).not.toBeNull());
  });

  test("should log error on API fail", async () => {
    (getMovieList as jest.Mock).mockReturnValue(Promise.reject("Error"));
    const { queryByTestId } = render(<Home />);
    await waitFor(() => expect(getMovieList).toHaveBeenCalled());
    await waitFor(() => expect(queryByTestId("loader")).toBeNull());
  });

  test("Movie list is loaded on load", async () => {
    (getMovieList as jest.Mock).mockReturnValue(Promise.resolve(mockData));
    const { queryByText } = render(<Home />);
    await waitFor(() => expect(queryByText(/A New Hope/)).toBeDefined());
  });

  test("testing 1 2", async () => {
    (getMovieList as jest.Mock).mockReturnValue(Promise.resolve(mockData));

    const { queryByTestId, queryByText } = render(<Home />);

    await waitFor(() => expect(queryByTestId("loader")).toBeNull());

    const refHeader = await queryByTestId("header");

    if (refHeader)
      act(() => {
        fireEvent.change(refHeader, {
          target: {
            value: "Test",
          },
        });
      });

    await waitFor(() => expect(queryByText(/A New Hope/)).toBeNull());
    await waitFor(() => expect(queryByTestId("no-results")).toBeDefined());

    if (refHeader)
      act(() => {
        fireEvent.change(refHeader, {
          target: {
            value: "",
          },
        });
      });

    await waitFor(() => expect(queryByText(/A New Hope/)).toBeDefined());
  });
});
