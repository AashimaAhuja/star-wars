import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import userEvent from "@testing-library/user-event";

const props = {
  onMovieSearch: jest.fn(),
};
describe("Header", () => {
  test("renders Header component", () => {
    render(<Header {...props} />);
  });
  test("seach for movie on input type", () => {
    render(<Header {...props} />);
    userEvent.type(screen.getByRole("textbox"), "new hope");
    expect(props.onMovieSearch).toHaveBeenCalled();
  });
});
