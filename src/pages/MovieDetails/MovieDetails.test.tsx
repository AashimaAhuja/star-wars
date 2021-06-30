import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { getMovieDetails } from "../../services/movieDetailsService";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime.js";

// jest.mock("../../services/movieDetailsService", () => ({
//   getMovieList: jest.fn(() => ({
//     then: () => ({
//       catch: jest.fn(),
//     }),
//   })),
// }));
const mockData = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl:
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  director: "George Lucas",
  producer: "Gary Kurtz, Rick McCallum",
  release_date: "1977-05-25",
};

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    id: 1,
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../services/movieDetailsService", () => ({
  getMovieDetails: jest.fn(() => ({
    then: () => ({
      catch: jest.fn(),
    }),
  })),
}));

describe("Movie Details Page", () => {
  test("renders Movie Details component", () => {
    render(<MovieDetails />);
  });
  test("Should render initial loader", async () => {
    const { queryByText } = render(<MovieDetails />);
    await waitFor(() => expect(queryByText("loader")).toBeDefined());
  });

  test("Should load movie details", async () => {
    (getMovieDetails as jest.Mock).mockReturnValue(Promise.resolve(mockData));
    const { getByTestId } = render(<MovieDetails />);
    await waitFor(() => expect(getMovieDetails).toHaveBeenCalled());
    await waitFor(() => expect(getByTestId("movie-details")).toBeDefined());
  });

  test("should log error on API fail", async () => {
    (getMovieDetails as jest.Mock).mockReturnValue(Promise.reject("Error"));
    const { queryByTestId } = render(<MovieDetails />);
    await waitFor(() => expect(getMovieDetails).toHaveBeenCalled());
    await waitFor(() => expect(queryByTestId("loader")).toBeNull());
  });

  test("Should go to home page on logo click", async () => {
    const { queryByTestId } = render(<MovieDetails />);
    //@ts-ignore
    userEvent.click(queryByTestId("goToHomePage"));
    await waitFor(() => expect(queryByTestId("searchbox")).toBeDefined());
  });
});
