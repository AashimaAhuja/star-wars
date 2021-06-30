import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MovieCard from "./MovieCard";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime.js";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const defaultProps = {
  title: "test Movie",
  url: "/test",
  key: "test",
};
describe("Movie Card", () => {
  test("renders movie card", () => {
    render(<MovieCard {...defaultProps} />);
  });

  test("go to detail page on card click", async () => {
    const { queryByText } = render(<MovieCard {...defaultProps} />);
    userEvent.click(screen.getByRole("img"));
    await waitFor(() => expect(queryByText(/test Movie/)).toBeDefined());
  });
});
